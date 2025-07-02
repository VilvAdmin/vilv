# Vilv

## Design choices

- Auth: Clerk (Free until 10.000 monthly active users)
- Infra: Vercel (Free for expected amount of compute & network)
- DB: Neon - Postgres (Free up to 0.5 GB storage & 190 compute hours)
- Mail: Resend (Free up to 3.000 emails per month & up to 100 emails per day)
- Components: Shadcn + Tailwind
- ORM: Drizzle
- Framework: Next.js

## TODO

- [x] Reload for status change issue
- [x] Edit game functionality
- [x] Sidenav reloads when opening game details
- [x] Logo issue in game details page
- [x] Add from RFBA
- [x] Calendar export
- [x] Mobile resolutions
- [x] Calendar export on mobile
- [x] Add player + player overview
- [x] Player edit
- [x] Show players without status in game details
- [x] Player uniqueness validation
- [x] Seasonality
- [x] Refresh data after dialogs close
- [x] Reminder mails (https://resend.com/ ?)
- [ ] Games get deleted when changing competition or team names (I think we had the same problem before when changing the time or date)
- [ ] When changing a player status from inactive to active, it looses its admin rights
- [x] Training details screen still shows WEDSTRIJDDETAILS at the top
- [x] There is something wrong with the list length under page 'Trainingsdetails': it do'esnt show all of the active players; it looks like only the last 10 new players and all that already filled it in show up on the combined lists
- [x] Aantal spelers counter under trainings shows the amount of reactions and not the amount of available players (maybe that was intentional, but might be a bit confusing)
- [ ] Date picker -> start on Monday + allow typing + dd/mm/yyyy
- [ ] Match day selection
- [ ] Player delete - needs to be thought out -> statistics etc
- [ ] Edit API / mgmt for admin -> see if needed
- [ ] Optimize images
- [ ] Refactor out Clerk (?)
- [ ] Player details page (?)
- [ ] Analytics (?)
- [ ] Domain stuff (custom domain for Vercel, Neon?, Resend)
