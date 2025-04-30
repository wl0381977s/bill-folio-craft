
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

interface BillSummaryProps {
  billNumber: string;
  clientName: string;
  amount: string;
  date: string;
  status: 'paid' | 'pending' | 'overdue';
}

const statusStyles = {
  paid: "bg-green-100 text-green-800 hover:bg-green-200",
  pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
  overdue: "bg-red-100 text-red-800 hover:bg-red-200",
};

const statusText = {
  paid: "Paid",
  pending: "Pending",
  overdue: "Overdue",
};

const BillSummary = ({ billNumber, clientName, amount, date, status }: BillSummaryProps) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-5">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-medium">{billNumber}</h3>
          <Badge className={statusStyles[status]} variant="outline">
            {statusText[status]}
          </Badge>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Client</span>
            <span className="text-sm font-medium">{clientName}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Amount</span>
            <span className="text-sm font-medium">{amount}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Due Date</span>
            <div className="flex items-center">
              <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
              <span className="text-sm">{date}</span>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex justify-between border-t border-gray-100 mt-2">
        <Button variant="outline" size="sm" className="text-xs">
          View Details
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem className="text-xs">Edit Invoice</DropdownMenuItem>
            <DropdownMenuItem className="text-xs">Mark as Paid</DropdownMenuItem>
            <DropdownMenuItem className="text-xs text-red-600">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>
    </Card>
  );
};

export default BillSummary;
