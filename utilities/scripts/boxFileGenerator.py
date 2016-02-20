
import argparse
import os

#This script maid for Tesseract box file generation 
 
def sort_logs_by_date(arm_file, eng_file, out_file):
    if os.path.exists(out_file) and (not os.stat(out_file).st_size == 0):
        print 'The ' + out_file + ' out is not empty... '
        return
    lines = []
    lines1 = __read_from_log_file(arm_file);
    lines1 = ('\n'.join(lines1)).split();
    lines2 = __read_from_log_file(eng_file);
    if lines1 and len(lines1) is len(lines2):
        file = open(out_file, 'a')
        for i in range (0,len(lines1)):
            #armenian character len is 2
            if (len(lines1[i]) == 2):
                try:
                    lines2[i] = lines2[i][lines2[i].index(' '):len(lines2[i])]
                except ValueError:
                    pass  #TBD is this correct behavior or no
                file.write(lines1[i] + lines2[i])
            else:
                print 'Armenian file content is incorrect ...'
        file.close()
        print 'Done... \n' + 'Created ' + out_file + ' file ... '
    else:
        print 'Sizes of the ' + arm_file + ' and ' + eng_file + ' files are not equal ... or files are empty'

def __read_from_log_file(file_name):
    lines = [];
    try:
        with open(file_name, 'r') as f:
            for line in f:
               lines.append(line)
        f.closed
        return lines
    except IOError, e:
        print log_file_path + ' ' + str(e)

            
def arg_parser():
    arg_parser = argparse.ArgumentParser(
            description='The script meargs the log files by date')
    arg_parser.add_argument('-a', '--arm', 
            action='store', 
            dest='arm_file', 
            default='a', 
            help='path of arm file')
    arg_parser.add_argument('-e', '--eng', 
            action='store', 
            dest='eng_file', 
            default='b', 
            help='eng file path.')
    arg_parser.add_argument('-o', '--out', 
            action='store', 
            dest='out_file', 
            default='c', 
            help='eng file path.')
    args = arg_parser.parse_args()
    return args


def main():
    try:
        arguments = arg_parser()
        sort_logs_by_date(arguments.arm_file, arguments.eng_file, arguments.out_file)
    except Exception, e:
        print e

if __name__ == "__main__":
    main()
