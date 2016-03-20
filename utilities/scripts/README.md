**Box file generator**
========

*Content*
--------

```
 1. Goals
 2. Environment
 3. Usage
 4. Directory structure
```

*Goals*
--------

This is the README file for Box file generator script which generates box files from given font names and font sizes

*Environment*
--------
- paps (sudo apt-get install paps)
- tesseract (TBD)
- gs (TBD)

*Usage*
--------
python main.py -f < fonts_file_path > -s < size_file_path >

Note: -f and -s flags are optional, default paths are:
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

TBD Need to add unit tests
