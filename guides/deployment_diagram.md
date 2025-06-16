# Application Architecture Diagram

```
┌──────────────────────────────┐
│   User Browser (Client)       │
│  Access via Domain Name       │
│  os-project-next-js.vercel.app│
└──────────────┬───────────────┘
               │
               ▼
   DNS Resolves to Public IP
               │
               ▼
┌────────────────────────────────────┐
│       Ubuntu VM (App Server)       │
│  With Public IP                    │
│ Domain: os-project-next-js.vercel.app │
├────────────────────────────────────┤
│  ┌──────────────┐                  │
│  │   NGINX      │                  │
│  └────┬─────────┘                  │
│       │                            │
│       ▼                            │
│  ┌──────────────────────────┐      │
│  │ Node.js (Next.js App)    │      │
│  │ Port: localhost:3000     │      │
│  │ Managed by PM2           │      │
│  └────────────┬─────────────┘      │
│               │                    │
│               ▼                    │
│   ┌────────────────────────┐       │
│   │ MongoDB (Database)     │       │
│   │ On localhost           │       │
│   │ DB Name: os_project    │       │
│   └────────────────────────┘       │
└────────────────────────────────────┘
               ▲
               │
      Response Returned via Same Path
```

