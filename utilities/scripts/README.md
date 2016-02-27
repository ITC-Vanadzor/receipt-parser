**Box file generator**
========

*Content*
--------

```
 1. Goals
 2. Usage
 3. Directory structure
```
*Goals*
--------

This is the README file Box file generator which generates box files from given fonts and font sizes

*Usage*
--------
python main.py -f < fonts_file_path > -s < size_file_path >

Note: -f and -s flags are optional by default paths are:
- -f resources/fonts.txt
- -s resources/size.json 

*Directory structure*
--------
* README.md 
* utils
    * util.py  
* main.py
* generate_box_files.py 
* resources:
    * alph.txt
    * Unicode
    * fonts.txt
    * size.json  
