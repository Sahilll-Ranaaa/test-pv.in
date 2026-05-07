import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, Calculator, FileText, Layout, Lightbulb } from "lucide-react";

export default function NavItems() {
  return (
    <div>
      <NavigationMenu className="hidden md:flex">
        <NavigationMenuList>
          {/* What We Do Dropdown */}
          <NavigationMenuItem>
            <NavigationMenuTrigger>What We Do?</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="flex flex-col gap-3 p-3">
                <ListItem
                  href="/consulting"
                  title="Consulting"
                  className="w-[200px]"
                ></ListItem>
                <ListItem
                  href="/outsourcing"
                  title="Outsourcing"
                  className="w-[200px]"
                ></ListItem>
                <ListItem
                  href="/technology"
                  title="Technology"
                  className="w-[200px]"
                ></ListItem>
                <ListItem
                  href="/start-up-solution"
                  title="Start-up Solution"
                  className="w-[200px]"
                ></ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link href="/about" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                About Us
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink
              href="https://thepvhub.com"
              target="_blank"
              className={navigationMenuTriggerStyle()}
            >
              ThePVhub
            </NavigationMenuLink>
          </NavigationMenuItem>

          {/* Resources Mega Menu */}
          <NavigationMenuItem>
            <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="flex justify-center p-8 bg-white">
                <div className="grid w-[800px] grid-cols-[1fr_1fr_1.5fr] gap-12">
                  {/* Column 1: Learn */}
                  <div className="space-y-6">
                    <h4 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-4 relative">
                      Learn
                      <div className="absolute bottom-0 left-0 w-8 h-[2px] bg-[#9f0202]" />
                    </h4>
                    <ul className="space-y-4">
                      <MegaMenuItem href="/resources" title="Knowledge Repository" />
                      <MegaMenuItem href="/thought-leadership" title="Thought Leadership" />
                      <MegaMenuItem href="/case-studies" title="Case Studies" />
                    </ul>
                  </div>
                  
                  {/* Column 2: Free Tools */}
                  <div className="space-y-6">
                    <h4 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-4 relative">
                      Free Tools
                      <div className="absolute bottom-0 left-0 w-8 h-[2px] bg-[#9f0202]" />
                    </h4>
                    <ul className="space-y-4">
                      <MegaMenuItem href="/resources" title="PO Generator" />
                      <MegaMenuItem href="/resources" title="Invoice Generator" />
                    </ul>
                  </div>

                  {/* Column 3: Featured Content */}
                  <div className="bg-gray-50/50 rounded-2xl p-6 flex flex-col justify-between border border-gray-100/50">
                     <div className="space-y-4">
                       <div className="relative h-40 w-full rounded-xl overflow-hidden shadow-sm">
                          <Image 
                            src="/about-us-hero.webp" 
                            alt="Featured Resource" 
                            fill 
                            className="object-cover"
                          />
                          <div className="absolute top-2 left-2 px-2 py-0.5 bg-[#9f0202] text-white text-[8px] font-black uppercase rounded shadow-sm">
                            Featured Insight
                          </div>
                       </div>
                       <div>
                         <h3 className="font-bold text-gray-900 text-base leading-tight">PV Strategy Framework 2026</h3>
                         <p className="text-[11px] text-gray-500 mt-2 leading-relaxed">Download our latest blueprint for navigating complex regulatory landscapes.</p>
                       </div>
                     </div>
                     <Link href="/resources" className="text-[10px] font-black uppercase text-[#9f0202] flex items-center gap-2 group pt-4 mt-auto hover:opacity-80 transition-opacity">
                       Explore Repository <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                     </Link>
                  </div>
                </div>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

const MegaMenuItem = ({ href, title }) => (
  <li>
    <Link href={href} legacyBehavior passHref>
      <NavigationMenuLink className="block text-[13px] font-medium text-gray-500 hover:text-[#9f0202] transition-colors leading-none">
        {title}
      </NavigationMenuLink>
    </Link>
  </li>
);

const ListItem = ({ className, title, children, ...props }) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
        </a>
      </NavigationMenuLink>
    </li>
  );
};
ListItem.displayName = "ListItem";
