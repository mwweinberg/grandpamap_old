import csv
import json



out_list = []

exampleFile = open('metadata.csv')
exampleReader = csv.reader(exampleFile)
exampleData = list(exampleReader)

for item in exampleData:
    print(item[0])
    print('**')

    #variables to create the file names here
    previewlocation = "/files/preview/" + item[6] + ".jpg"
    documentlocation = "/files/docs/" + item[7] + ".pdf"

    #creates a dictionary for each line
    out_dict = {"type": "Feature", "properties": {"OriginalFilename":item[0], "NewFileName":item[1], "Year":int(item[2]), "Month":int(item[3]), "Day":int(item[4]), "LocationName":item[5], "PreviewLocation": previewlocation, "DocumentLocation": documentlocation, "Pages": int(item[8]), "Author": item[9], "Recipient": item[10], "Photo": int(item[11]), "Lat": float(item[12]), "Lon": float(item[13]), "Notable": item[14]}, "geometry": {"type": "Point", "coordinates": [float(item[12]), float(item[13])]}}

    #which is then appended to the list
    out_list.append(out_dict)

print(out_list)

#the list of dictionaries is added to the output dictionary that has all of the other stuff that the geojson needs
final_dict = {"type": "FeaturesCollection", "features": out_list}

with open('out.json', 'w') as fout:
    json.dump(final_dict, fout)
#json.dumps(final_dict)

