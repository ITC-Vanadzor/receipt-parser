
from utils import util
from utils.util import bcolors
from utils.NotFound import NotFound

'''
Path Constants 

'''
PATH_PAPS='/usr/bin/paps'
PATH_FONTS='/.fonts'
PATH_ALPH='resources/alph.txt'
PATH_FONTS_DIR='resources/Unicode'
'''
Commands Constants
'''
PS_GENERATE='paps --lpi=%d --cpi=%d --font=%s.tif %s' 
GS_GENERATE='gs -q -dNOPAUSE -dBATCH -sDEVICE=tiffg4 -sPAPERSIZE=a4 -sOutputFile=%s.tif %s.ps'
TESSERACT_COMMAND='tesseract -psm 6 %s.tif %s batch.nochop makebox'
VERSION_COMMAND='%s --version'

def __copy_font_files(path):
    home = util.get_home_dir_name()
    util.create_dir(home + PATH_FONTS)
    util.copy_files(path, home + PATH_FONTS)

def __generate_ps(lpi_value, cpi_value, font_name):
    if util.file_has_x_permission(PATH_PAPS) is not None:
       ps_content = util.run_command( PS_GENERATE % (lpi_value, cpi_value, font_name, PATH_ALPH))
       file_name = font_name + '_' +  str(lpi_value) + '_' +  str(cpi_value) 
       util.write_in_file(file_name + '/' + file_name + '.ps', ps_content)
    else:
        raise NotFound('Error: can not run paps command') 

def __generate_tif(ps_file_name):
    gs =  util.run_command(VERSION_COMMAND % 'gs')
    if not gs is None:
        util.run_command(GS_GENERATE % (ps_file_name, ps_file_name))
        print (bcolors.OKGREEN + 'Done: Created' + \
            ps_file_name + '.tif file' + bcolors.ENDC)
    else:
        raise NotFound('Error: can not run gs command') 

def __generate_box(tif_file_name):
    tesseract =  util.run_command(VERSION_COMMAND % 'tesseract')
    if not tesseract is None:
        util.run_command(TESSERACT_COMMAND % (tif_file_name, tif_file_name))
        print (bcolors.OKGREEN + 'Done: Created ' + \
             tif_file_name + '.box file' + bcolors.ENDC)
    else:
        raise NotFound('Error: can not run tesseract command') 

def __correct_box(arm_file, eng_file, out_file):
    lines = []
    lines1 = util.read_from_file(arm_file);
    lines1 = ('\n'.join(lines1)).split();
    lines2 = util.read_from_file(eng_file);
    content = ''
    if lines1 and lines2 and len(lines1) is len(lines2):
        for i in range (0,len(lines1)):
            if not (len(lines1[i]) == (2,1)):
                try:
                    lines2[i] = lines2[i][lines2[i].index(' '):len(lines2[i])]
                    content = content + lines1[i] + lines2[i]
                except ValueError:
                    print(bcolors.FAIL + ' Incorrect box file coordinates ... ' + bcolors.ENDC)
                    return
            else:
                print(bcolors.FAIL + ' Armenian file content is incorrect ... ' + bcolors.ENDC)
                return
        util.write_in_file(out_file, content)
        print (bcolors.OKGREEN + 'Done... \n' + 'Created ' + out_file + ' file ... ' + bcolors.ENDC)
    else:
        raise NotFound('Sizes of the ' + arm_file + ' and ' + eng_file + ' files are not equal ... or files are empty') 

def __generate_and_correct_box_file(size_lpi, size_cpi, font):
    font_name = font.replace("\n", "")
    file_name = font_name +  '_' + str(size_lpi) + '_' +  str(size_cpi)
    file_full_name = file_name + '/' + file_name
    util.create_dir(file_name)
    __generate_ps(size_lpi, size_cpi, font_name)
    __generate_tif(file_full_name)
    __generate_box(file_full_name)
    __correct_box(PATH_ALPH, file_full_name + '.box', file_full_name + '_correct.box')


def __generate_and_correct_box_files(size_file, font_file):
    __copy_font_files(PATH_FONTS_DIR)
    fonts = util.read_from_file(font_file)
    sizes = util.read_json_from_file(size_file)
    if not (fonts is None or sizes is None):
        for size in sizes:
            try:
                size_lpi = size['lpi']
                size_cpi = size['cpi']
            except KeyError, e:
                print(bcolors.WARNING + 'Warning: size file content ... ' + bcolors.ENDC)
                return
            for font in fonts:
                __generate_and_correct_box_file(size_lpi, size_cpi, font)
    else:
        raise NotFound('Error: Incorrect fonts or size files ...') 
    
    
def generate(size_file, font_file):
    if util.is_unix():
        __generate_and_correct_box_files(size_file, font_file)
    else:
        print(bcolors.FAIL + 'Error: Unsupported platform ... ' + bcolors.ENDC)

