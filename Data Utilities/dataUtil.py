# Jacob Bryant

# Automates taking a row from Excel and converting it to XML for use in Access

# -- Resources
# https://openpyxl.readthedocs.io/en/stable/tutorial.html#playing-with-data
# https://automatetheboringstuff.com/chapter12/

# write the xml file...

import openpyxl

class Record:
        def __init__(self, month, sortie_count, pilot_sorties, squadron):
            self.month = month;
            self.sortie_count = sortie_count;
            self.pilot_sorties = pilot_sorties;
            self.squadron= squadron;
        
# -- These both could have user given arguments
file_name = "Statistical Assessment.xlsx";
sheet_name = "Stats Method 2.0"

# -- Open the working sheet
wb = openpyxl.load_workbook(file_name, data_only=True); # Get the workbook
sheet = wb[sheet_name]; # Get the sheet
wb.active = sheet;

# This could easy be made into a small GUI
squadron_column_num = input("Please enter the squadron column number: ");
squadron = sheet['A'+squadron_column_num].value;


record_list = [];

column_num = input("Please the column number of dates: ");
cell_let = 'A';
val = "";
while val != None:
    cell_let = chr(ord(cell_let)+1);
    cell = cell_let + column_num;
    val = sheet[cell].value;
    if val == None:
        break;
    record_list += [Record(val, 0, 0, squadron)]

# -- Set these in a function
column_num = input("Please the column of sortie count: ");
cell_let = 'A';
val = "";
i = 0;
it = 1;
for k in range(0, len(record_list)//2):
    cell_let = chr(ord(cell_let)+it);
    cell = cell_let + column_num;
    val = sheet[cell].value;
    record_list[i].sortie_count = val;
    record_list[i+1].sortie_count = val;
    i+=2;
    it=2;

column_num = input("Please the column of pilot sorties: ");
cell_let = 'A';
val = "";
i = 0;
it = 1;
for k in range(0, len(record_list)//2):
    cell_let = chr(ord(cell_let)+it);
    cell = cell_let + column_num;
    val = sheet[cell].value;
    record_list[i].pilot_sorties = val;
    record_list[i+1].pilot_sorties = val;
    i+=2;
    it=2;

record_name = "record.xml";
record_file = open(record_name, "w");
record_file.write('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n');
record_file.write('<data-set xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">\n');

for i in record_list:
    record_file.write('\t<record>\n')
    
    tag = "\t\t<Month>"+str(i.month)+"</Month>\n"
    record_file.write(tag);
    tag = "\t\t<SortieCount>"+str(i.sortie_count)+"</SortieCount>\n"
    record_file.write(tag);
    tag = "\t\t<PilotSorties>"+str(i.pilot_sorties)+"</PilotSorties>\n"
    record_file.write(tag);
    tag = "\t\t<Squadron>"+str(i.squadron)+"</Squadron>\n"
    record_file.write(tag);
    
    record_file.write('\t</record>\n')
    
record_file.write('</data-set>');
record_file.close();
