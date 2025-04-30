
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarIcon, Plus, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import Layout from '@/components/Layout';
import { toast } from '@/hooks/use-toast';

const formSchema = z.object({
  invoiceNumber: z.string().min(1, { message: 'Numéro de facture requis' }),
  date: z.date(),
  dueDate: z.date(),
  clientId: z.string().min(1, { message: 'Client requis' }),
  items: z.array(
    z.object({
      productId: z.string().min(1, { message: 'Produit requis' }),
      quantity: z.coerce.number().min(1, { message: 'Quantité minimale: 1' }),
      price: z.coerce.number().min(0, { message: 'Prix invalide' }),
      discount: z.coerce.number().min(0).max(100, { message: 'Remise entre 0 et 100%' }).default(0),
    })
  ).min(1, { message: 'Ajoutez au moins un article' }),
  notes: z.string().optional(),
  paymentMethod: z.string().min(1, { message: 'Moyen de paiement requis' }),
  status: z.string().min(1, { message: 'Statut requis' }),
});

type FormValues = z.infer<typeof formSchema>;

// Mock data
const clients = [
  { id: '1', name: 'Acme Corporation' },
  { id: '2', name: 'Globex Industries' },
  { id: '3', name: 'Wayne Enterprises' },
];

const products = [
  { id: '1', name: 'Ordinateur portable Pro', price: 1299.99 },
  { id: '2', name: 'Smartphone XL', price: 899.99 },
  { id: '3', name: 'Écouteurs sans fil', price: 129.99 },
  { id: '4', name: 'Montre connectée', price: 249.99 },
];

const paymentMethods = ['Carte bancaire', 'Virement', 'Chèque', 'Espèces'];
const invoiceStatuses = ['Brouillon', 'En attente', 'Payée', 'Annulée'];

const CreateInvoicePage = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      invoiceNumber: `FAC-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
      date: new Date(),
      dueDate: new Date(new Date().setDate(new Date().getDate() + 30)),
      items: [{ productId: '', quantity: 1, price: 0, discount: 0 }],
      paymentMethod: 'Virement',
      status: 'Brouillon',
      notes: '',
    },
  });

  const { fields, append, remove } = form.useFieldArray({
    name: "items",
  });

  const onSubmit = (data: FormValues) => {
    console.log('Données de la facture:', data);
    toast({
      title: "Facture créée avec succès",
      description: `La facture n° ${data.invoiceNumber} a été créée.`,
    });
  };

  const calculateSubtotal = () => {
    const items = form.getValues('items');
    return items.reduce((sum, item) => {
      const price = item.price || 0;
      const quantity = item.quantity || 0;
      const discount = item.discount || 0;
      return sum + (price * quantity * (1 - discount / 100));
    }, 0);
  };

  const handleProductChange = (index: number, productId: string) => {
    const selectedProduct = products.find(p => p.id === productId);
    if (selectedProduct) {
      form.setValue(`items.${index}.price`, selectedProduct.price);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto py-6">
        <h2 className="text-2xl font-bold mb-6">Créer une facture</h2>

        <Card>
          <CardHeader>
            <CardTitle>Nouvelle facture</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <FormField
                    control={form.control}
                    name="invoiceNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>N° Facture</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Date de facturation</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, 'P', { locale: fr })
                                ) : (
                                  <span>Choisir une date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="dueDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Date d'échéance</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, 'P', { locale: fr })
                                ) : (
                                  <span>Choisir une date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="clientId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Client</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionner un client" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {clients.map((client) => (
                              <SelectItem key={client.id} value={client.id}>
                                {client.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="paymentMethod"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Moyen de paiement</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionner un mode de paiement" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {paymentMethods.map((method) => (
                              <SelectItem key={method} value={method}>
                                {method}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Statut</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionner un statut" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {invoiceStatuses.map((status) => (
                              <SelectItem key={status} value={status}>
                                {status}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Articles</h3>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => append({ productId: '', quantity: 1, price: 0, discount: 0 })}
                    >
                      <Plus className="h-4 w-4 mr-2" /> Ajouter un article
                    </Button>
                  </div>

                  {fields.map((field, index) => (
                    <div key={field.id} className="grid grid-cols-12 gap-4 items-center bg-gray-50 p-3 rounded-md">
                      <FormField
                        control={form.control}
                        name={`items.${index}.productId`}
                        render={({ field }) => (
                          <FormItem className="col-span-12 md:col-span-5">
                            <FormLabel className={cn(index !== 0 && "sr-only")}>
                              Produit
                            </FormLabel>
                            <Select
                              onValueChange={(value) => {
                                field.onChange(value);
                                handleProductChange(index, value);
                              }}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Sélectionner un produit" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {products.map((product) => (
                                  <SelectItem key={product.id} value={product.id}>
                                    {product.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`items.${index}.quantity`}
                        render={({ field }) => (
                          <FormItem className="col-span-6 md:col-span-2">
                            <FormLabel className={cn(index !== 0 && "sr-only")}>
                              Quantité
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min={1}
                                {...field}
                                onChange={(e) => field.onChange(parseInt(e.target.value))}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`items.${index}.price`}
                        render={({ field }) => (
                          <FormItem className="col-span-6 md:col-span-2">
                            <FormLabel className={cn(index !== 0 && "sr-only")}>
                              Prix (€)
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                step="0.01"
                                min={0}
                                {...field}
                                onChange={(e) => field.onChange(parseFloat(e.target.value))}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`items.${index}.discount`}
                        render={({ field }) => (
                          <FormItem className="col-span-6 md:col-span-2">
                            <FormLabel className={cn(index !== 0 && "sr-only")}>
                              Remise (%)
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min={0}
                                max={100}
                                {...field}
                                onChange={(e) => field.onChange(parseInt(e.target.value))}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="col-span-6 md:col-span-1 flex justify-center">
                        <Button
                          type="button"
                          size="sm"
                          variant="ghost"
                          className="text-red-500 hover:text-red-700"
                          onClick={() => fields.length > 1 && remove(index)}
                          disabled={fields.length <= 1}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="flex justify-end">
                    <div className="w-64 space-y-2">
                      <div className="flex justify-between">
                        <span>Sous-total:</span>
                        <span className="font-medium">{calculateSubtotal().toFixed(2)} €</span>
                      </div>
                      <div className="flex justify-between">
                        <span>TVA (20%):</span>
                        <span className="font-medium">{(calculateSubtotal() * 0.2).toFixed(2)} €</span>
                      </div>
                      <div className="flex justify-between border-t pt-2 text-lg font-bold">
                        <span>Total:</span>
                        <span>{(calculateSubtotal() * 1.2).toFixed(2)} €</span>
                      </div>
                    </div>
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notes</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end gap-4">
                  <Button type="button" variant="outline">
                    Annuler
                  </Button>
                  <Button type="submit">
                    Créer la facture
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default CreateInvoicePage;
