import csv  # https://docs.python.org/3/library/csv.html

# https://django-extensions.readthedocs.io/en/latest/runscript.html

# python3 manage.py runscript many_load

from unesco.models import Site, Category, State, Region, Iso


def run():
    fhand = open('unesco/whc-sites-2018-clean.csv')
    reader = csv.reader(fhand)
    next(reader)  # Advance past the header

    Site.objects.all().delete()
    Category.objects.all().delete()
    State.objects.all().delete()
    Region.objects.all().delete()
    Iso.objects.all().delete()


    for row in reader:
        try:
            year = int(row[3])
        except Exception:
            year = None

        try:
            longitude = float(row[4])
        except Exception:
            longitude = None
            
        try:
            latitude = float(row[5])
        except Exception:
            latitude = None

        try:
            area_hectares = float(row[6])
        except Exception:
            area_hectares = None
               
        category, created = Category.objects.get_or_create(name=row[7])
        state, created = State.objects.get_or_create(name=row[8])
        region, created = Region.objects.get_or_create(name=row[9])        
        iso, created = Iso.objects.get_or_create(name=row[10])
        s = Site(name=row[0], description=row[1], justification=row[2], year=year, \
                longitude=longitude, latitude=latitude, area_hectares=area_hectares,\
                category=category, state=state, region=region, iso=iso)
        s.save()

