import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronRight, Users, BarChart, Search, Tag, MessageSquare } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="mr-4 flex">
            <div className="flex items-center space-x-2">
              <Users className="h-6 w-6" />
              <span className="font-bold text-xl">TalentSync</span>
            </div>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-2">
              <Link href="/login">
                <Button variant="outline">Log in</Button>
              </Link>
              <Link href="/register">
                <Button>Get Started</Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-muted/50 to-muted">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Nurture Relationships, Streamline Recruiting
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  TalentSync helps agency recruiters leverage their candidate data with powerful insights and smart automation.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/register">
                  <Button size="lg" className="gap-1.5">
                    Start Free Trial
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/demo">
                  <Button size="lg" variant="outline">
                    Request Demo
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative h-[450px] w-full rounded-xl border bg-background p-4 shadow-lg">
                <div className="absolute left-4 right-4 top-4 h-8 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-red-500" />
                    <div className="h-2 w-2 rounded-full bg-yellow-500" />
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                  </div>
                  <div className="w-1/2 h-4 rounded-md bg-muted/50" />
                </div>
                <div className="mt-8 space-y-4">
                  <div className="h-20 rounded-md border bg-card p-2 shadow-sm">
                    <div className="flex justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 rounded-full bg-primary/20" />
                        <div className="h-4 w-20 rounded-md bg-muted/70" />
                      </div>
                      <div className="h-4 w-12 rounded-md bg-muted/70" />
                    </div>
                    <div className="mt-2 h-8 w-full rounded-md bg-muted/30" />
                  </div>
                  {/* Repeat for visual effect */}
                  <div className="h-20 rounded-md border bg-card p-2 shadow-sm">
                    <div className="flex justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 rounded-full bg-primary/20" />
                        <div className="h-4 w-24 rounded-md bg-muted/70" />
                      </div>
                      <div className="h-4 w-14 rounded-md bg-muted/70" />
                    </div>
                    <div className="mt-2 h-8 w-full rounded-md bg-muted/30" />
                  </div>
                  <div className="h-20 rounded-md border bg-card p-2 shadow-sm">
                    <div className="flex justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 rounded-full bg-primary/20" />
                        <div className="h-4 w-28 rounded-md bg-muted/70" />
                      </div>
                      <div className="h-4 w-10 rounded-md bg-muted/70" />
                    </div>
                    <div className="mt-2 h-8 w-full rounded-md bg-muted/30" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Features</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Everything you need to succeed</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our platform helps you manage candidates, track interactions, and make data-driven decisions to improve your recruitment process.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
            <div className="grid gap-6">
              {/* Feature 1 */}
              <div className="flex flex-col gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Comprehensive Candidate Profiles</h3>
                <p className="text-muted-foreground">
                  Store and manage detailed candidate information including skills, experience, preferences, and personal details for better matching.
                </p>
              </div>
              {/* Feature 2 */}
              <div className="flex flex-col gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Search className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Advanced Search & Lists</h3>
                <p className="text-muted-foreground">
                  Quickly find the right candidates with powerful filtering options and save searches for future reference.
                </p>
              </div>
            </div>
            <div className="grid gap-6">
              {/* Feature 3 */}
              <div className="flex flex-col gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Tag className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Smart Tagging & Categorization</h3>
                <p className="text-muted-foreground">
                  Organize candidates with custom tags and categories to create targeted talent pools and streamline your sourcing efforts.
                </p>
              </div>
              {/* Feature 4 */}
              <div className="flex flex-col gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <BarChart className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Intelligent Recommendations</h3>
                <p className="text-muted-foreground">
                  Get actionable insights on when and how to engage with candidates based on their behavior and profile data.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ready to transform your recruitment process?</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Join hundreds of successful recruitment agencies already using TalentSync to manage their candidates more effectively.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/register">
                <Button size="lg">Get Started</Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline">Contact Sales</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t bg-background py-6 md:py-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="flex items-center space-x-2">
              <Users className="h-6 w-6" />
              <span className="font-bold">TalentSync</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} TalentSync. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}