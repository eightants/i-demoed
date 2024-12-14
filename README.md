<h3 align="center"><img src="public/images/idemoed-frame.png" width="500px" alt="I Demoed"></h3>

[I Demoed](https://idemoed.vercel.app) is a hackathon badge showcase service in SVG and raster format, which can easily be included in GitHub readmes or any other webpage. The service supports badge generation from a user's Devpost activity and custom specified badges. With the prevalence of virtual hackathons, this service provides a way for the hackathon community to continue collecting the hexagon "I Demoed" stickers prominent in MLH events.

![Demo](public/images/wall.svg)

## Quickstart

```
https://idemoed.vercel.app/api/wall?username=<USERNAME>&limit=<LIMIT>&level=<LEVEL>&events=<EVENTS>&pr=<PR>&size=<SIZE>&type=<TYPE>&placeholder=<PLACEHOLDER>
```

Just `https://idemoed.vercel.app/api/wall?username=<USERNAME>` is enough to generate a hex-tiled showcase based on a user's Devpost username. Detailed documentation on each query parameter can [be found on the website](https://idemoed.vercel.app).

In Markdown: `![My Wall](https://idemoed.vercel.app/api/wall?username=<USERNAME>)`

In HTML: `<img src="https://idemoed.vercel.app/api/wall?username=<USERNAME>"/>`

## Contributing

I Demoed is a community project. Improving the service by submitting badges and improving features is appreciated. Want hackers to showcase your hackathon event badge or want to add past events you participated in? Start an issue or open a pull request to expand the badge database!

### Submitting Badges via Issues

**Devpost Hackathons**

If your hackathon is on Devpost, [visit the issue page](https://github.com/eightants/i-demoed/issues), select `New issue > Submit Devpost Badge` and provide the following information.

- Badge Image: PNG image of a hexagon sticker with correct dimensions (minimum 181x209)
- Devpost Link: Link to event on Devpost (e.g. tamuhack2020.devpost.com)

**Other Hackathons/Events**

If your hackathon does not use Devpost but would still like users to showcase the badge, [visit the issue page](https://github.com/eightants/i-demoed/issues), select `New issue > Submit Other Badge` with the following information. Badges added using this method will not be automatically matched through devpost usernames and will need to be manually specified in the events parameter.

- Badge Image: PNG image of a hexagon sticker with correct dimensions (minimum 181x209)
- name: Name of event
- id: Will be used as identifier and as image name (`<id>.png`). A good convention is `eventnameYYYY.png`, for example `myhackathon2020.png`. `id` must not already exist in `/public/badges/alt`
- description: Optional description of event
- url: Optional event link

### Submitting Badges via Pull Requests

- First, make sure you're the owner of the hexagon you are submitting!
- Fork this repo
- Next step depends on your hackathon platform

**Devpost Hackathons**

Place your event badge PNG image in `/public/badges/devpost` with the image name as `<event_name>.png` corresponding to the event URL on Devpost `<event_name>.devpost.com`. If your event's Devpost URL is tamuhack2020.devpost.com, your badge should be named `tamuhack2020.png`

**Other Hackathons/Events**

If your hackathon does not use Devpost,

- Place your event badge PNG image in `/public/badges/alt` with the image name as `<id>.png`. A good convention is `eventnameYYYY.png`, for example `myhackathon2020.png`.
- Add a new metadata file named `<id>.json` in `/public/badges/alt_meta` with the template below.

```
{
  "name": "Event name",
  "id":
    "Will be used as identifier and as image name (<id>.png). Must not already exist in /public/badges/alt",
  "description": "Optional description of event",
  "url": "Optional event link"
}
```

- `id` must be unique in `/alt`!

Make sure `id` only has lowercase letters, numbers and hyphens. Remove any optional fields you aren't using, and make sure the last field doesn't have a trailing comma at the end of it.

Then make a pull request to this repo. Use the `devpost badge` label or `other badge` label as necessary. 

### Development

1. Clone this repository
2. Install packages with `npm i`
3. Start development server with `npm run build`
4. Open pull request