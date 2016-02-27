import generate_box_files as generate
import argparse


#This script generates box files from given fonts and sizes

def arg_parser():
    arg_parser = argparse.ArgumentParser(
            description='The script generates box files')
    arg_parser.add_argument('-s', '--size', 
            action='store', 
            dest='size_file', 
            default='resources/size.json', 
            help='path of size file')
    arg_parser.add_argument('-f', '--font', 
            action='store', 
            dest='font_file', 
            default='resources/fonts.txt', 
            help='path of font file.')
    args = arg_parser.parse_args()
    return args


def main():
    try:
        arguments = arg_parser()
        generate.generate(arguments.size_file, arguments.font_file)
    except Exception, e:
        print e

if __name__ == "__main__":
    main()
