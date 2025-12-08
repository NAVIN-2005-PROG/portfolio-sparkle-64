-- Create profiles table for user data
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  first_name TEXT DEFAULT '',
  last_name TEXT DEFAULT '',
  email TEXT,
  bio TEXT DEFAULT '',
  location TEXT DEFAULT '',
  website TEXT DEFAULT '',
  photo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile"
ON public.profiles FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile"
ON public.profiles FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
ON public.profiles FOR UPDATE
USING (auth.uid() = user_id);

-- Create portfolios table
CREATE TABLE public.portfolios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  template_id INTEGER NOT NULL,
  template_name TEXT NOT NULL,
  name TEXT NOT NULL DEFAULT 'My Portfolio',
  data JSONB NOT NULL DEFAULT '{}',
  style JSONB NOT NULL DEFAULT '{}',
  share_link TEXT UNIQUE,
  is_public BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on portfolios
ALTER TABLE public.portfolios ENABLE ROW LEVEL SECURITY;

-- Portfolios policies
CREATE POLICY "Users can view their own portfolios"
ON public.portfolios FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Anyone can view public portfolios"
ON public.portfolios FOR SELECT
USING (is_public = true);

CREATE POLICY "Users can insert their own portfolios"
ON public.portfolios FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own portfolios"
ON public.portfolios FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own portfolios"
ON public.portfolios FOR DELETE
USING (auth.uid() = user_id);

-- Create function to auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_portfolios_updated_at
BEFORE UPDATE ON public.portfolios
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, first_name)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data ->> 'first_name', 'Poovi'));
  RETURN NEW;
END;
$$;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Generate unique share links
CREATE OR REPLACE FUNCTION public.generate_share_link()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.share_link IS NULL THEN
    NEW.share_link = encode(gen_random_bytes(8), 'hex');
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER set_portfolio_share_link
BEFORE INSERT ON public.portfolios
FOR EACH ROW EXECUTE FUNCTION public.generate_share_link();