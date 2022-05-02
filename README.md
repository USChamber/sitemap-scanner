# Sitemap Scanner

This simple tool allows you to scan your website's sitemap
and export the resulting URLs as a json file

This is useful for identifiying whether a URL is in the sitemap or not.

## Usage

To use this run the following command:

```bash
    node index.js https://www.uschamber.com/sitemap.xml   # or whatever path you want

```

If you are are looking for a specific URL you can have the tool output whether it exists or not (and stop search if found);

```bash
    node index.js https://www.uschamber.com/sitemap.xml https://www.uschamber.com/environment/u-s-chamber-statement-on-proposed-asbestos-ban

```
