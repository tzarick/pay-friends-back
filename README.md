# pay-friends-back

An interactive cli tool for squaring up with friends after uneven spending.

(the second generation of this tool lives [here](https://github.com/tzarick/pay-friends-back-web))
## Usage

![PFB Demo](demo/demo.gif)

## Run and Build

after installing dependencies:

- run: `npm run start`
- build: `npm run build` for an executable. This will be placed in a `build` folder.

## Motivation

Picture this... you're heading off for a camping trip to Lake Michigan with good friends. You're imagining the soft, warm sand of the dunes under your feet, the smell of pure Great Lake and campfire, the sound of crashing waves on the shoreline, and of enjoying the orange glow of the fire underneath a cozy treeline canopy, all among the best company you could wish for. Life is good and gratitude abounds. You hope you can appreciate it while it lasts and you wish you could capture this period of time and keep it forever, releasing a little at a time throughout the rest of the year, to even things out a bit.

The _last_ thing you're thinking about is who is going to pay for what on the way. Someone might get gas, someone else gets food on the road, someone else brought soup, trail mix, peanut butter, and tortillas for food at camp. No one cares about evening up in the moment. And no need to! That's a bit of a buzzkill anyway. Someone just says "we'll square up later" and everyone carries on.

Returning home, we go to even up - everyone lists off how much they paid (which already seems hard enough to get out of everyone in a timely manner). Then, someone has to figure out who pays who what to make sure that each person will have "spent" exactly the grand total divided by the number of people, which may mean that 2 or 3 or 4 or 5 etc transactions must occur. The more people involved, the harder this someone has to think... In short, I'd rather just plug these numbers in, get a list of who pays who, and move on.

I realize we could avoid any "complicated" (aka just requiring slightly more brain power than I'd prefer for something that feels like it should be quick mental math... :sweat_smile:) math if we just picked one person to pay for everything for the whole trip. This logically makes sense but practically doesn't always work out if we want to tag team preparation in parallel. Plus, it feels nice for people to be able to offer to pay for things along the way, even if we intend on evening out in the end. It feels like we're sharing the load together along the journey.

## Future Todos

~~It would be nice to be able to easily use this from a phone to have the option to square up in the car on the way home, in the above scenario for example. Maybe build this into an api to be called via the web in some fashion.~~ EDIT: this is done :exclamation: Check it out for a more pleasant UX -> [PFB web](https://github.com/tzarick/pay-friends-back-web)
