import pandas as pd 

template = '''<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://www.cletenant.com/</loc>
        <lastmod>2026-06-08</lastmod>
    </url>

    <url>
        <loc>https://www.cletenant.com/about</loc>
        <lastmod>2026-06-08</lastmod>
    </url>
'''

def url_template(path, date='2026-06-08'):
    return f'''
    <url>
        <loc>https://www.cletenant.com/{path}</loc>
        <lastmod>{date}</lastmod>
    </url>
    '''

owners = pd.read_csv('transformed/owners.csv')
owners = owners[owners.parcels_owned > 1][['owner_id']]
for owner_id in owners['owner_id']:
    template += url_template(f'owner/{owner_id}')

parcels = pd.read_csv('transformed/parcels.csv')
parcels = parcels[parcels.activerentalregistrationflag == 1][['parcel']]
for parcel in parcels['parcel']:
    template += url_template(f'parcel/{parcel}')

with open('sitemap.xml', 'w') as file:
    file.write(template + '\n</urlset>')