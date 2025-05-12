import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const activities = [
  {
    id: 1,
    type: "call",
    title: "Call with Sarah Johnson",
    description: "Discussed role at Tesla, interested in Sr. Product Manager positions",
    timestamp: "2 hours ago",
    user: {
      name: "Alex Morgan",
      avatar: "/avatars/01.png",
      initials: "AM"
    }
  },
  {
    id: 2,
    type: "email",
    title: "Email sent to David Chen",
    description: "Follow-up about the interview at Google scheduled for next Tuesday",
    timestamp: "4 hours ago",
    user: {
      name: "Jordan Lee",
      avatar: "/avatars/02.png",
      initials: "JL"
    }
  },
  {
    id: 3,
    type: "note",
    title: "Note added to Michael Brown",
    description: "Updated compensation expectations to $180-200k base",
    timestamp: "Yesterday at 3:45 PM",
    user: {
      name: "Taylor Swift",
      avatar: "/avatars/03.png",
      initials: "TS"
    }
  },
  {
    id: 4,
    type: "status",
    title: "Status update for Emily Davis",
    description: "Changed from 'In Process' to 'Offer Extended'",
    timestamp: "Yesterday at 11:30 AM",
    user: {
      name: "Riley Cooper",
      avatar: "/avatars/04.png",
      initials: "RC"
    }
  },
  {
    id: 5,
    type: "interview",
    title: "Interview scheduled with James Wilson",
    description: "Technical interview with Engineering team at Stripe",
    timestamp: "2 days ago",
    user: {
      name: "Alex Morgan",
      avatar: "/avatars/01.png",
      initials: "AM"
    }
  }
];

export function ActivityFeed() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>
          You had 48 activities in the last 7 days
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {activities.map((activity) => (
            <div className="flex items-start" key={activity.id}>
              <Avatar className="h-9 w-9 mr-4">
                <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                <AvatarFallback>{activity.user.initials}</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">{activity.title}</p>
                <p className="text-sm text-muted-foreground">
                  {activity.description}
                </p>
                <div className="flex items-center pt-2">
                  <span className="text-xs text-muted-foreground">
                    {activity.timestamp} by {activity.user.name}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}