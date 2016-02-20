import unittest
import filecmp
import boxFileGenerator
import os

class TestBoxFileGenerator(unittest.TestCase):
    def testXMLFormatGeneratorFromCorrectDir(self):
        test_arm = 'testBoxFileGenerator/resources/arm'
        test_box = 'testBoxFileGenerator/resources/box'
        boxFileGenerator.sort_logs_by_date(test_arm, test_box, 'out')
        is_equal = filecmp.cmp('out','testBoxFileGenerator/resources/golden_out')
        self.assertEqual(True,is_equal)
        try:
            if os.path.exists('out'):
                os.remove('out') 
        except IOError, e:
            print e
