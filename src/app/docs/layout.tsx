import { DocsSidebar } from "@/components/docs-sidebar";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="shell py-12 md:py-16">
      <div className="flex flex-col lg:flex-row gap-12 items-start">
        <DocsSidebar />
        <div className="min-w-0 flex-1 max-w-3xl prose-sm">
          {children}
        </div>
      </div>
    </div>
  );
}
