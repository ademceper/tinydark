"use client";

import { Input } from "@/components/ui/input";

import * as React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  CommandDialog,
  CommandInput,
  CommandList,
} from "@/components/ui/command";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  SearchIcon,
  Plus,
  MessageSquare,
  ListPlus,
  Mail,
  FileDown,
  Check,
  Share2,
  Clock,
  Star,
  Briefcase,
  Calendar,
  Settings,
  FileText,
  Folder,
  Keyboard,
  LayoutDashboard,
  MessagesSquare,
  FileIcon,
  SearchX,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Drawer, DrawerContent, DrawerHeader } from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-breakpoint";

export default function Search() {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const router = useRouter();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const mobileInputRef = React.useRef<HTMLInputElement>(null);
  const isMobile = useIsMobile();

  const isMac =
    typeof window !== "undefined" && window.navigator.platform.includes("Mac");
  const keySymbol = isMac ? "⌘" : "Ctrl";

  // Sample recent searches
  const recentSearches = [
    {
      id: "user1",
      name: "Jason Woordheart",
      detail: "jason@dribbble.com",
      avatar: "/abstract-jw.png",
      actions: ["chat", "list"],
      type: "person",
      lastActive: "2 hours ago",
    },
    {
      id: "user2",
      name: "Rob Miller",
      detail: "rob@icloud.com",
      avatar: "/abstract-geometric-shapes.png",
      actions: ["list"],
      type: "person",
      lastActive: "1 day ago",
    },
    {
      id: "user3",
      name: "Hannah Steward",
      detail: "replied on thread",
      avatar: "/high-school-hallway.png",
      actions: ["mail", "list"],
      type: "person",
      lastActive: "3 days ago",
    },
    {
      id: "project1",
      name: "Website Redesign",
      detail: "12 tasks remaining",
      avatar: "/abstract-geometric-wr.png",
      actions: ["star"],
      type: "project",
      lastActive: "5 hours ago",
    },
    {
      id: "doc1",
      name: "Q3 Marketing Plan",
      detail: "Updated yesterday",
      avatar: "/musical-performance.png",
      actions: ["share"],
      type: "document",
      lastActive: "Yesterday",
    },
  ];

  // Navigation items
  const navItems = [
    {
      title: "Dashboard",
      url: "/dashboard",
      shortcut: "D",
      icon: <LayoutDashboard className="h-4 w-4" />,
    },
    {
      title: "Projects",
      url: "/projects",
      shortcut: "P",
      icon: <Briefcase className="h-4 w-4" />,
    },
    {
      title: "Calendar",
      url: "/calendar",
      shortcut: "C",
      icon: <Calendar className="h-4 w-4" />,
    },
    {
      title: "Messages",
      url: "/messages",
      shortcut: "M",
      icon: <MessagesSquare className="h-4 w-4" />,
    },
    {
      title: "Files",
      url: "/files",
      shortcut: "F",
      icon: <FileIcon className="h-4 w-4" />,
    },
    {
      title: "Settings",
      url: "/settings",
      shortcut: "S",
      icon: <Settings className="h-4 w-4" />,
    },
  ];

  // Quick actions
  const quickActions = [
    {
      id: "task",
      icon: <Plus className="h-4 w-4" />,
      label: "Create new task",
      shortcut: "E",
    },
    {
      id: "note",
      icon: <Plus className="h-4 w-4" />,
      label: "Create note",
      shortcut: "N",
    },
    {
      id: "member",
      icon: <Plus className="h-4 w-4" />,
      label: "Add member",
      shortcut: "R",
    },
    {
      id: "meeting",
      icon: <Plus className="h-4 w-4" />,
      label: "Schedule meeting",
      shortcut: "M",
    },
  ];

  // Files
  const files = [
    {
      id: "invoice",
      icon: <FileDown className="h-4 w-4" />,
      name: "Invoice",
      type: "pdf",
      verified: true,
      size: "2.4 MB",
      updated: "2 days ago",
    },
    {
      id: "presentation",
      icon: <FileText className="h-4 w-4" />,
      name: "Quarterly Presentation",
      type: "pptx",
      verified: true,
      size: "5.7 MB",
      updated: "1 week ago",
    },
    {
      id: "contract",
      icon: <FileText className="h-4 w-4" />,
      name: "Client Contract",
      type: "docx",
      verified: false,
      size: "1.2 MB",
      updated: "3 days ago",
    },
  ];

  // Recent folders
  const folders = [
    {
      id: "designs",
      name: "Design Assets",
      items: 24,
      updated: "Yesterday",
    },
    {
      id: "docs",
      name: "Documentation",
      items: 13,
      updated: "3 days ago",
    },
    {
      id: "marketing",
      name: "Marketing Materials",
      items: 8,
      updated: "1 week ago",
    },
  ];

  const handleNavigation = (path: string) => {
    setOpen(false);
    // Add a small delay to ensure the dialog closes before navigation
    setTimeout(() => {
      router.push(path);
    }, 100);
  };

  // Filter results based on query
  const filteredItems = React.useMemo(() => {
    let items = [...recentSearches];

    // Filter by search query
    if (query) {
      items = items.filter(
        (item) =>
          item.name.toLowerCase().includes(query.toLowerCase()) ||
          item.detail.toLowerCase().includes(query.toLowerCase())
      );
    }

    return items;
  }, [query, recentSearches]);

  // Filter files based on query
  const filteredFiles = React.useMemo(() => {
    if (!query) return files;
    return files.filter(
      (file) =>
        file.name.toLowerCase().includes(query.toLowerCase()) ||
        file.type.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, files]);

  // Filter folders based on query
  const filteredFolders = React.useMemo(() => {
    if (!query) return folders;
    return folders.filter((folder) =>
      folder.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, folders]);

  // Filter quick actions based on query
  const filteredQuickActions = React.useMemo(() => {
    if (!query) return quickActions;
    return quickActions.filter(
      (action) =>
        action.label.toLowerCase().includes(query.toLowerCase()) ||
        action.shortcut.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, quickActions]);

  // Filter navigation items based on query
  const filteredNavItems = React.useMemo(() => {
    if (!query) return navItems;
    return navItems.filter(
      (item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        (item.shortcut &&
          item.shortcut.toLowerCase().includes(query.toLowerCase()))
    );
  }, [query, navItems]);

  // Check if there are any results at all
  const hasAnyResults = React.useMemo(() => {
    return (
      filteredItems.length > 0 ||
      filteredFiles.length > 0 ||
      filteredFolders.length > 0 ||
      filteredQuickActions.length > 0 ||
      filteredNavItems.length > 0
    );
  }, [
    filteredItems,
    filteredFiles,
    filteredFolders,
    filteredQuickActions,
    filteredNavItems,
  ]);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey) {
        if (e.key.toLowerCase() === "k") {
          e.preventDefault();
          setOpen((prev) => !prev); // Toggle open state
          return;
        }

        const matchedItem = navItems.find(
          (item) =>
            item.shortcut && item.shortcut.toLowerCase() === e.key.toLowerCase()
        );
        if (matchedItem) {
          e.preventDefault();
          handleNavigation(matchedItem.url);
        }
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open]);

  React.useEffect(() => {
    if (open && !isMobile && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }

    if (open && isMobile && mobileInputRef.current) {
      setTimeout(() => {
        mobileInputRef.current?.focus();
      }, 100);
    }
  }, [open, isMobile]);

  const handleQuickAction = (actionId: string) => {
    // Handle quick actions
    console.log(`Executing quick action: ${actionId}`);
    setOpen(false);

    // Example routing based on action
    switch (actionId) {
      case "task":
        router.push("/tasks/new");
        break;
      case "note":
        router.push("/notes/new");
        break;
      case "member":
        router.push("/team/invite");
        break;
      case "meeting":
        router.push("/calendar/new");
        break;
      default:
        break;
    }
  };

  const handleFileAction = (fileId: string, action: string) => {
    console.log(`File ${fileId}: ${action}`);
    // Handle file actions
  };

  // Search content - reused in both desktop and mobile views
  const SearchContent = () => (
    <>
      {/* Dynamic height command list with auto-scrolling */}
      <div className="overflow-x-hidden">
        {/* No Results State */}
        {query && !hasAnyResults && (
          <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <SearchX className="h-12 w-12 text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-medium mb-1">No results found</h3>
            <p className="text-sm text-muted-foreground mb-6 max-w-md">
              We couldn&apos;t find anything matching &apos;{query}&apos;. Try adjusting your
              search terms.
            </p>
            <Button variant="outline" size="sm" onClick={() => setQuery("")}>
              Clear search
            </Button>
          </div>
        )}

        <AnimatePresence>
          {/* Recent searches */}
          {filteredItems.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="border-b border-border/10"
            >
              <div className="flex items-center justify-between px-4 py-1.5">
                <p className="text-xs text-muted-foreground">
                  Results{" "}
                  <span className="ml-2 text-foreground">
                    {filteredItems.length}
                  </span>
                </p>
                {filteredItems.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 px-2 text-xs"
                  >
                    <Clock className="h-3 w-3 mr-1" />
                    Sort by recent
                  </Button>
                )}
              </div>

              <div className="px-2">
                {filteredItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between px-2 py-2 rounded-md hover:bg-accent/5 cursor-pointer transition-colors"
                    onClick={() => {
                      if (item.type === "person") {
                        handleNavigation(`/profile/${item.id}`);
                      } else if (item.type === "project") {
                        handleNavigation(`/projects/${item.id}`);
                      } else if (item.type === "document") {
                        handleNavigation(`/documents/${item.id}`);
                      }
                    }}
                  >
                    <div className="flex items-center min-w-0">
                      <Avatar className="h-8 w-8 flex-shrink-0 mr-3">
                        <AvatarImage
                          src={item.avatar || "/placeholder.svg"}
                          alt={item.name}
                        />
                        <AvatarFallback className="text-xs">
                          {item.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <div className="flex items-center space-x-2">
                          <p className="text-sm font-medium truncate">
                            {item.name}
                          </p>
                          <Badge
                            variant="outline"
                            className="flex-shrink-0 text-[10px] px-1 py-0"
                          >
                            {item.type}
                          </Badge>
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <span className="truncate">{item.detail}</span>
                          <span className="mx-1 flex-shrink-0">•</span>
                          <span className="flex-shrink-0">
                            {item.lastActive}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0 ml-2">
                      {item.actions.includes("chat") && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 rounded-full"
                        >
                          <MessageSquare className="h-4 w-4 text-muted-foreground" />
                        </Button>
                      )}
                      {item.actions.includes("list") && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 rounded-full"
                        >
                          <ListPlus className="h-4 w-4 text-muted-foreground" />
                        </Button>
                      )}
                      {item.actions.includes("mail") && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 rounded-full"
                        >
                          <Mail className="h-4 w-4 text-muted-foreground" />
                        </Button>
                      )}
                      {item.actions.includes("star") && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 rounded-full"
                        >
                          <Star className="h-4 w-4 text-muted-foreground" />
                        </Button>
                      )}
                      {item.actions.includes("share") && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 rounded-full"
                        >
                          <Share2 className="h-4 w-4 text-muted-foreground" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Quick actions */}
          {filteredQuickActions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: 0.1 }}
              className="border-b border-border/10"
            >
              <div className="px-4 py-1.5">
                <p className="text-xs text-muted-foreground">
                  Quick actions{" "}
                  <span className="ml-2 text-foreground">
                    {filteredQuickActions.length}
                  </span>
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-2">
                {filteredQuickActions.map((action) => (
                  <div
                    key={action.id}
                    className="flex items-center justify-between p-2 rounded-md hover:bg-accent/5 cursor-pointer transition-colors"
                    onClick={() => handleQuickAction(action.id)}
                  >
                    <div className="flex items-center min-w-0">
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md mr-3">
                        {action.icon}
                      </div>
                      <p className="text-sm truncate">{action.label}</p>
                    </div>
                    <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded bg-muted text-xs ml-2">
                      {action.shortcut}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Files */}
          {filteredFiles.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: 0.2 }}
              className="border-b border-border/10"
            >
              <div className="flex items-center justify-between px-4 py-1.5">
                <p className="text-xs text-muted-foreground">
                  Files{" "}
                  <span className="ml-2 text-foreground">
                    {filteredFiles.length}
                  </span>
                </p>
                <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                  <Folder className="h-3 w-3 mr-1" />
                  Browse all
                </Button>
              </div>
              <div className="space-y-1 p-2">
                {filteredFiles.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center justify-between p-2 rounded-md hover:bg-accent/5 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center min-w-0">
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-accent/10 mr-3">
                        {file.icon}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center">
                          <p className="text-sm truncate">
                            {file.name}
                            <span className="text-muted-foreground">
                              .{file.type}
                            </span>
                          </p>
                          {file.verified && (
                            <Check className="ml-2 h-3 w-3 text-green-500 flex-shrink-0" />
                          )}
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <span className="flex-shrink-0">{file.size}</span>
                          <span className="mx-1 flex-shrink-0">•</span>
                          <span className="flex-shrink-0">{file.updated}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 rounded-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleFileAction(file.id, "download");
                        }}
                      >
                        <FileDown className="h-4 w-4 text-muted-foreground" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 gap-1 text-xs"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleFileAction(file.id, "share");
                        }}
                      >
                        <Share2 className="h-3 w-3" />
                        Share
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Folders */}
          {filteredFolders.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: 0.3 }}
              className="border-b border-border/10"
            >
              <div className="flex items-center px-4 py-1.5">
                <p className="text-xs text-muted-foreground">
                  Folders{" "}
                  <span className="ml-2 text-foreground">
                    {filteredFolders.length}
                  </span>
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 p-2">
                {filteredFolders.map((folder) => (
                  <div
                    key={folder.id}
                    className="flex flex-col p-3 rounded-md border border-border/10 hover:bg-accent/5 transition-colors cursor-pointer"
                    onClick={() => handleNavigation(`/folders/${folder.id}`)}
                  >
                    <div className="flex items-center mb-2">
                      <Folder className="h-4 w-4 text-muted-foreground mr-2 flex-shrink-0" />
                      <p className="text-sm font-medium truncate">
                        {folder.name}
                      </p>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{folder.items} items</span>
                      <span>{folder.updated}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          <div className="h-px bg-border/10 my-1" />

          {/* Navigation */}
          {filteredNavItems.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: 0.4 }}
              className="py-2"
            >
              <div className="px-4 py-1.5">
                <p className="text-xs text-muted-foreground">
                  Navigation{" "}
                  <span className="ml-2 text-foreground">
                    {filteredNavItems.length}
                  </span>
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 p-2">
                {filteredNavItems.map((item) => (
                  <Link
                    key={item.title}
                    href={item.url}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between p-2 cursor-pointer rounded-md hover:bg-accent/5 transition-colors"
                  >
                    <div className="flex items-center min-w-0">
                      <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded bg-accent/10 mr-2">
                        {item.icon}
                      </div>
                      <span className="truncate">{item.title}</span>
                    </div>
                    <div className="flex h-5 items-center justify-center rounded border px-1.5 text-xs flex-shrink-0 ml-2">
                      {keySymbol} {item.shortcut}
                    </div>
                  </Link>
                ))}
              </div>

              <div className="p-2 text-center">
                <p className="text-xs text-muted-foreground flex items-center justify-center">
                  <Keyboard className="h-3 w-3 mr-1" />
                  Press{" "}
                  <kbd className="mx-1 px-1 py-0.5 rounded bg-muted text-xs">
                    {keySymbol}K
                  </kbd>{" "}
                  to open this menu anytime
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );

  return (
    <>
        {isMobile && (
        <button
          className="border-input bg-background text-foreground rounded-lg placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:ring-ring/50 inline-flex h-10 border px-3 py-2 text-sm transition-all hover:bg-accent/50 outline-none focus-visible:ring-2"
          onClick={() => setOpen(true)}
        >
          <span className="flex grow items-center">
            <SearchIcon
              className="text-muted-foreground/80 -ms-1 me-3"
              size={16}
              aria-hidden="true"
            />
            <span className="text-muted-foreground/70 font-normal">Search</span>
          </span>
          <kbd className="text-muted-foreground/70 ms-9 -me-1 inline-flex h-10 items-center rounded px-1.5 font-mono text-[10px] font-medium" />
        </button>
      )}

      {!isMobile && (
        <button
          className="border-input bg-background text-foreground placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:ring-ring/50 inline-flex h-9 rounded-md border px-3 py-2 text-sm shadow-xs transition-all hover:bg-accent/50 outline-none focus-visible:ring-2"
          onClick={() => setOpen(true)}
        >
          <span className="flex grow items-center">
            <SearchIcon
              className="text-muted-foreground/80 -ms-1 me-3"
              size={16}
              aria-hidden="true"
            />
            <span className="text-muted-foreground/70 font-normal">Search</span>
          </span>
          <kbd className="bg-muted text-muted-foreground/70 ms-12 -me-1 inline-flex h-5 max-h-full items-center rounded border px-1.5 font-mono text-[10px] font-medium">
            <span className="text-xs">{keySymbol}</span> K
          </kbd>
        </button>
      )}

      {/* Desktop Command Dialog */}
      {!isMobile && (
        <CommandDialog
          open={open}
          onOpenChange={setOpen}
          className="overflow-hidden border border-border/10 bg-[#121212] backdrop-blur-xl max-w-2xl w-[95vw] md:w-[80vw] lg:w-[65vw]"
        >
          <div className="flex items-center border-b border-border/10 px-3">
            <CommandInput
              ref={inputRef}
              placeholder="Search for action, people, instruments..."
              value={query}
              onValueChange={setQuery}
              className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-offset-0 flex-1 w-full"
            />
          </div>

          <CommandList className="max-h-[calc(80vh-80px)] overflow-y-auto">
            <SearchContent />
          </CommandList>
        </CommandDialog>
      )}

      {/* Mobile Drawer for Search */}
      {isMobile && (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerContent className="max-h-[85vh]">
            <DrawerHeader className="px-4 py-2 border-b border-border/10">
              <div className="flex items-center">
                <div className="relative flex-1">
                  <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    ref={mobileInputRef}
                    placeholder="Search for anything..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="pl-8 pr-8 h-9 border-none bg-muted/50 focus-visible:ring-0 w-full"
                  />
                  {query && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-9 w-9"
                      onClick={() => setQuery("")}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </DrawerHeader>
            <div className="overflow-y-auto">
              <SearchContent />
            </div>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
}
