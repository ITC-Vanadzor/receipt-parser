import os
import stat
import shutil
from os.path import expanduser

#paps --lpi=2 --cpi=6 --font=FreeMono.ttf alph.txt

def fileHasXPermission(path):
    try:
        st = os.stat(path)
        return bool(st.st_mode & stat.S_IXUSR)
    except OSError, e:
        print str(e)
        return None
        # TBD install paps from peckage


def copyFilesByExtension(fromPath, toPath, fileExtension = None):
    try:
        src_files = os.listdir(fromPath)
        for file_name in src_files:
            name, extension = os.path.splitext(file_name)
            if not fileExtension is None or (not fileExtension is None and fileExtension == extension):
                #if fileExtension == extension:
                full_file_name = os.path.join(fromPath, file_name)
                if (os.path.isfile(full_file_name)):
                    shutil.copy(full_file_name, toPath)
    except OSError, e:
        print 'Cen not copy files from ' + fromPath + ' to ' + toPath
        print str (e)



def create_dir(path):
    try:
        if not os.path.exists(path):
            os.makedirs(path)
    except OSError, e:
        print str (e)


def main():
    if fileHasXPermission('/usr/bin/paps') is not None:
       home = expanduser("~")
       create_dir(home + '/.fonts')
       copyFilesByExtension('Unicode', home +'/.fonts', 'ttf')
       pass
    else:
        print 'Please install paps ...'
        print 'Try to ...'
        print 'sudo apt-get install paps'

main()
