
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";
import { Cake, Cupcake, Cookie, CakeSlice } from "lucide-react";
import { cn } from "@/lib/utils";
import React from "react";

const ProductNavMenu = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent">Products</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid grid-cols-2 w-[600px] gap-3 p-4">
              <Link to="/brownies" className="flex items-start space-x-3 rounded-md p-3 hover:bg-pink-light">
                <Cookie className="h-6 w-6 text-pink-dark flex-shrink-0" />
                <div>
                  <div className="font-medium">Brownies</div>
                  <p className="text-sm text-gray-600">Indulge in our delicious handcrafted brownies.</p>
                </div>
              </Link>
              <Link to="/cakes" className="flex items-start space-x-3 rounded-md p-3 hover:bg-pink-light">
                <Cake className="h-6 w-6 text-pink-dark flex-shrink-0" />
                <div>
                  <div className="font-medium">Cakes</div>
                  <p className="text-sm text-gray-600">Special divine cakes for every occasion.</p>
                </div>
              </Link>
              <Link to="/cupcakes" className="flex items-start space-x-3 rounded-md p-3 hover:bg-pink-light">
                <Cupcake className="h-6 w-6 text-pink-dark flex-shrink-0" />
                <div>
                  <div className="font-medium">Cupcakes</div>
                  <p className="text-sm text-gray-600">Delicious bite-sized cupcakes with premium frosting.</p>
                </div>
              </Link>
              <Link to="/cake-jars" className="flex items-start space-x-3 rounded-md p-3 hover:bg-pink-light">
                <CakeSlice className="h-6 w-6 text-pink-dark flex-shrink-0" />
                <div>
                  <div className="font-medium">Cake Jars</div>
                  <p className="text-sm text-gray-600">Layered cake desserts in convenient jars.</p>
                </div>
              </Link>
              <Link to="/cake-pops" className="flex items-start space-x-3 rounded-md p-3 hover:bg-pink-light">
                <CakeSlice className="h-6 w-6 text-pink-dark flex-shrink-0" />
                <div>
                  <div className="font-medium">Cake Pops</div>
                  <p className="text-sm text-gray-600">Fun bite-sized cake pops on a stick.</p>
                </div>
              </Link>
              <Link to="/other-products" className="flex items-start space-x-3 rounded-md p-3 hover:bg-pink-light">
                <CakeSlice className="h-6 w-6 text-pink-dark flex-shrink-0" />
                <div>
                  <div className="font-medium">All Specialty Products</div>
                  <p className="text-sm text-gray-600">Browse all of our specialty desserts.</p>
                </div>
              </Link>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default ProductNavMenu;
