
import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

type MenuItem = {
  id: string;
  title: string;
  path?: string;
  icon?: React.ReactNode;
  children?: MenuItem[];
};

interface MultiLevelMenuProps {
  items: MenuItem[];
  className?: string;
}

interface MenuItemComponentProps {
  item: MenuItem;
  level: number;
}

const MenuItemComponent = ({ item, level }: MenuItemComponentProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  const toggleMenu = () => {
    if (hasChildren) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className="w-full">
      <div 
        className={cn(
          "flex items-center justify-between py-2 px-4 rounded-md cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors",
          level > 0 && "pl-6",
          !item.path && hasChildren && "font-medium"
        )}
        onClick={toggleMenu}
      >
        <div className="flex items-center gap-2">
          {item.icon}
          {item.path ? (
            <Link 
              to={item.path} 
              className="w-full py-1 text-sm"
              onClick={(e) => e.stopPropagation()}
            >
              {item.title}
            </Link>
          ) : (
            <span className="text-sm">{item.title}</span>
          )}
        </div>
        {hasChildren && (
          <>
            {isOpen ? (
              <ChevronDown size={16} />
            ) : (
              <ChevronRight size={16} />
            )}
          </>
        )}
      </div>
      
      {hasChildren && isOpen && (
        <div className={cn("pl-2 border-l ml-4 my-1")}>
          {item.children?.map(child => (
            <MenuItemComponent key={child.id} item={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

const MultiLevelMenu = ({ items, className }: MultiLevelMenuProps) => {
  return (
    <div className={cn("w-full", className)}>
      {items.map(item => (
        <MenuItemComponent key={item.id} item={item} level={0} />
      ))}
    </div>
  );
};

export default MultiLevelMenu;
