/**
 * Templates Page
 * Displays 50+ portfolio templates organized by category
 * Users can preview and select templates to customize
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Eye, Edit, Star, Search } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { templates, categories } from '@/data/templates';

const Templates = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBySearch = templates.filter(
    t =>
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUseTemplate = (templateId: number) => {
    navigate(`/editor/template/${templateId}`);
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Templates</h1>
          <p className="text-muted-foreground">
            Choose from 50+ professionally designed templates to create your perfect portfolio
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-6 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Category Tabs */}
        <Tabs defaultValue="All" className="mb-8">
          <TabsList className="flex-wrap h-auto gap-2 bg-transparent p-0">
            {categories.map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                {category}
                <span className="ml-2 text-xs opacity-70">
                  ({category === 'All' 
                    ? filteredBySearch.length 
                    : filteredBySearch.filter(t => t.category === category).length})
                </span>
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category} value={category} className="mt-6">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredBySearch
                  .filter((t) => category === 'All' || t.category === category)
                  .map((template) => (
                    <Card
                      key={template.id}
                      className="group overflow-hidden hover:shadow-xl transition-all border-2 hover:border-primary/20"
                    >
                      {/* Template Preview */}
                      <div
                        className={`h-40 bg-gradient-to-br ${template.color} flex items-center justify-center relative overflow-hidden`}
                      >
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                        
                        {/* Mini Preview */}
                        <div className="relative z-10 text-white text-center px-4">
                          <div className="w-full max-w-[160px] mx-auto space-y-2">
                            <div className="h-2 bg-white/30 rounded w-1/2 mx-auto" />
                            <div className="h-4 bg-white/50 rounded" />
                            <div className="h-1.5 bg-white/30 rounded w-3/4 mx-auto" />
                            <div className="flex gap-1.5 justify-center mt-3">
                              <div className="w-10 h-4 bg-white/40 rounded" />
                              <div className="w-10 h-4 bg-white/40 rounded" />
                            </div>
                          </div>
                        </div>

                        {/* Hover Actions */}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <Button 
                            size="sm" 
                            variant="secondary"
                            onClick={() => handleUseTemplate(template.id)}
                          >
                            <Edit className="w-4 h-4 mr-1" />
                            Use
                          </Button>
                        </div>
                      </div>

                      {/* Template Info */}
                      <div className="p-4">
                        <h3 className="font-bold text-base mb-1 truncate">{template.name}</h3>
                        <p className="text-xs text-muted-foreground mb-2 line-clamp-1">
                          {template.description}
                        </p>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-xs px-2 py-0.5 bg-secondary rounded-full">
                            {template.category}
                          </span>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 fill-primary text-primary" />
                            <span className="text-xs font-medium">{template.rating}</span>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                          {template.uses.toLocaleString()} uses
                        </p>
                      </div>
                    </Card>
                  ))}
              </div>

              {/* Empty State */}
              {filteredBySearch.filter((t) => category === 'All' || t.category === category).length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No templates found matching your search.</p>
                  <Button
                    variant="link"
                    onClick={() => setSearchQuery('')}
                    className="mt-2"
                  >
                    Clear search
                  </Button>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>

        {/* Stats */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          Showing {filteredBySearch.length} of {templates.length} templates
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Templates;
