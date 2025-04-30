
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Plus, Trash2 } from 'lucide-react';

const InvoiceForm = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">Create New Invoice</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <Label htmlFor="client">Client</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a client" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="acme">Acme Corporation</SelectItem>
                  <SelectItem value="globex">Globex Industries</SelectItem>
                  <SelectItem value="wayne">Wayne Enterprises</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="issueDate">Issue Date</Label>
              <Input id="issueDate" type="date" />
            </div>
            <div>
              <Label htmlFor="invoiceNumber">Invoice #</Label>
              <Input id="invoiceNumber" placeholder="INV-2023-005" />
            </div>
            <div>
              <Label htmlFor="dueDate">Due Date</Label>
              <Input id="dueDate" type="date" />
            </div>
          </div>

          <Separator className="my-6" />
          
          <h3 className="text-sm font-medium mb-4">Invoice Items</h3>
          
          <div className="space-y-4 mb-4">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-5">
                <Label htmlFor="item-1-desc">Description</Label>
                <Input id="item-1-desc" placeholder="Web Development Services" />
              </div>
              <div className="col-span-2">
                <Label htmlFor="item-1-qty">Qty</Label>
                <Input id="item-1-qty" type="number" min="1" placeholder="1" />
              </div>
              <div className="col-span-2">
                <Label htmlFor="item-1-rate">Rate ($)</Label>
                <Input id="item-1-rate" placeholder="75.00" />
              </div>
              <div className="col-span-2">
                <Label htmlFor="item-1-amount">Amount</Label>
                <Input id="item-1-amount" readOnly value="$75.00" />
              </div>
              <div className="col-span-1 flex items-end justify-center">
                <Button variant="ghost" size="icon" className="text-red-500 h-10 w-10">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            className="text-xs mt-2 mb-6"
          >
            <Plus className="h-3.5 w-3.5 mr-1" />
            Add Item
          </Button>
          
          <Separator className="my-6" />
          
          <div className="flex justify-between items-center mt-4">
            <div>
              <Label htmlFor="notes">Notes</Label>
              <textarea 
                id="notes"
                className="w-full h-20 mt-1 px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Thank you for your business"
              ></textarea>
            </div>
            <div className="text-right space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 mr-8">Subtotal:</span>
                <span className="text-sm font-medium">$75.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 mr-8">Tax (10%):</span>
                <span className="text-sm font-medium">$7.50</span>
              </div>
              <div className="flex justify-between text-lg font-bold">
                <span className="mr-8">Total:</span>
                <span>$82.50</span>
              </div>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2 border-t pt-4">
        <Button variant="outline">Save as Draft</Button>
        <Button className="bg-theme-blue hover:bg-blue-700">Create Invoice</Button>
      </CardFooter>
    </Card>
  );
};

export default InvoiceForm;
