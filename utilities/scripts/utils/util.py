import os
import stat
import shutil
import commands
import platform
import sys
import time
import json

from os.path import expanduser

class bcolors:
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'

    def disable(self):
        self.HEADER = ''
        self.OKBLUE = ''
        self.OKGREEN = ''
        self.WARNING = ''
        self.FAIL = ''
        self.ENDC = ''

def file_has_x_permission(path):
    try:
        st = os.stat(path)
        return bool(st.st_mode & stat.S_IXUSR)
    except OSError, e:
        print(bcolors.FAIL + str(e) + bcolors.ENDC)
        return False
        # TBD install paps from peckage

def copy_files(fromPath, toPath, fileExtension = None):
    try:
        src_files = os.listdir(fromPath)
        for file_name in src_files:
            name, extension = os.path.splitext(file_name)
            if fileExtension is None or (not fileExtension is None and fileExtension == extension):
                full_file_name = os.path.join(fromPath, file_name)
                if (os.path.isfile(full_file_name)):
                    print 'Copping ' + file_name + ' file into ' + toPath + ' dir'
                    shutil.copy(full_file_name, toPath)
                    print_by_loading_bar()
    except OSError, e:
        print (bcolors.WARNING + str(e) + bcolors.ENDC)
    except IOError, e:
        print (bcolors.FAIL + str(e) + bcolors.ENDC)

def write_in_file(file_name, content):
    if os.path.exists(file_name) and (not os.stat(file_name).st_size == 0):
        #print 'The ' + file_name + ' out is not empty... '
        #return
        pass
    try:
        file = open(file_name, 'w')
        print 'Writing ' + file_name + ' into file'
        file.write(content)
        print_by_loading_bar()
        file.close()
        print (bcolors.OKGREEN + 'Done: Please check the results in the ' + file_name + ' file' + bcolors.ENDC)
    except IOError, e:
        print (bcolors.FAIL + 'Can not write into "' + file_name + '" file' + bcolors.ENDC)


def read_from_file(file_name):
    lines = [];
    try:
        with open(file_name, 'r') as f:
            for line in f:
               lines.append(line)
        f.closed
        return lines
    except IOError, e:
        print (bcolors.FAIL + str(e) + bcolors.ENDC)
        return None

def read_json_from_file(file_name):
    try:
        with open(file_name, 'r') as f:
            data = json.load(f)
        return data
    except IOError, e:
        print (bcolors.FAIL + str(e) + bcolors.ENDC)
        return None
    except ValueError, e:
        print (bcolors.FAIL + str(e) + bcolors.ENDC)
        return None

def run_command(command):
    print command
    result = commands.getstatusoutput(command)
    if result[0] is 0:
        return result[1]
    return None

def create_dir(path):
    try:
        if not os.path.exists(path):
            os.makedirs(path)
    except OSError, e:
        print (bcolors.FAIL + str(e) + bcolors.ENDC)

def get_platform_name():
    return platform.system()


def get_home_dir_name():
    return expanduser("~")

def is_unix():
    platform = get_platform_name()
    return platform == ('Linux' or 'Darwin')

def print_by_loading_bar():
    toolbar_width = 40
    sys.stdout.write('[%s]' % (' ' * toolbar_width))
    sys.stdout.flush()
    sys.stdout.write("\b" * (toolbar_width+1))
    for i in xrange(toolbar_width):
        time.sleep(0.008)
        sys.stdout.write('-')
        sys.stdout.flush()
    print (bcolors.OKGREEN + ' DONE ' + bcolors.ENDC)
    sys.stdout.write('\n')
