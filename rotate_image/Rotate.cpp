#include <opencv2/opencv.hpp>
#include <stdio.h>
#include <iostream>
#include <stdlib.h>

using namespace cv;
using namespace std;

int main(int argc, char** argv )
{
    if ( argc != 2 )
    {
        printf("usage: DisplayImage.out <Image_Path>\n");
        return -1;
    }

	Mat src=imread(argv[1],0);
	Mat thr,dst;
	threshold(src,thr,200,255,THRESH_BINARY_INV);
	imshow("thr",thr);

	std::vector<cv::Point> points;
	cv::Mat_<uchar>::iterator it = thr.begin<uchar>();
	cv::Mat_<uchar>::iterator end = thr.end<uchar>();
	for (; it != end; ++it)
		if (*it)
			points.push_back(it.pos());

	cv::RotatedRect box = cv::minAreaRect(cv::Mat(points));
	cv::Mat rot_mat = cv::getRotationMatrix2D(box.center, box.angle, 1);

	//cv::Mat rotated(src.size(),src.type(),Scalar(255,255,255));
	Mat rotated;
	cv::warpAffine(src, rotated, rot_mat, src.size(), cv::INTER_CUBIC);
	imshow("rotated",rotated);
    waitKey(0);
	imwrite("rotated.jpg",rotated);
//std::cout <<rotated.rows << " "  <<rotated.cols << std::endl;
//std::cout <<src.rows << " "  <<src.cols << std::endl;
//std::vector<std::vector<Point> > contours;
//std::vector<Vec4i> hierarchy;
//
//findContours( rotated, contours, hierarchy, CV_RETR_TREE, CV_CHAIN_APPROX_SIMPLE, Point(0, 0) );
//
///// Find the rotated rectangles and ellipses for each contour
//vector<RotatedRect> minRect( contours.size() );
//
//for( int i = 0; i < contours.size(); i++ )
//{ 
//	minRect[i] = minAreaRect( Mat(contours[i]) );
//}
//cv::Size s = src.size();
//for(int i=0;minRect.size();++i) {
//	cv::Size s_r = minRect[i].size;
//	if ((s_r.width ==0) || (s_r.height ==0)) continue;
//	if (s.width/s_r.width>s.height/s_r.height) {
//		std::cout << "YES" << std::endl;
//	} else {
//		std::cout << "NO" << std::endl;
//	}
//}
	return 0;
}
