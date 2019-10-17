#include <iostream>
#include <time.h>
#include <vector>
#include <cstdlib>
#include <algorithm>
using namespace std;

struct flight
{
	int day;
	string squad;
};

int getNumberOfDays (int, int);
int dayofweek (int, int, int);
void print (vector<int> const&);
void printst (vector<flight> const&);
void schedule (int, vector<int> &, vector<flight> &);
int main(int argc, char *argv[])
{
	time_t t = time(NULL);
	tm* timePtr = localtime(&t);
	vector<int> days_to_schedule;
	vector<flight> flight_list;
	cout << "Input the number of planes for the week: ";
	int planes = 0;
	cin >> planes;
	int monthflights = 30;
	int days_in_month = getNumberOfDays((timePtr->tm_mon)+1 , (timePtr->tm_year)+1900);
	cout << "\n Month: " << (timePtr->tm_mon)+1 << " Year: " << (timePtr->tm_year)+1900 << "\n";
	//find number of days and pull out weekends
	for (int i = 1; i<days_in_month+1; i++)
	{
		if(dayofweek(i, (timePtr->tm_mon)+1, (timePtr->tm_year)+1900)!=6 && dayofweek(i, (timePtr->tm_mon)+1, (timePtr->tm_year)+1900)!=0)
		{
				days_to_schedule.push_back(i);
		}
	}
	random_shuffle ( days_to_schedule.begin(), days_to_schedule.end() );
	print(days_to_schedule);
	schedule(monthflights, days_to_schedule, flight_list);
	cout << "\n";
	printst(flight_list);
}

//function will return total number of days
int  getNumberOfDays(int month, int year)
{
	//leap year condition, if month is 2
	if( month == 2)
	{
		if((year%400==0) || (year%4==0 && year%100!=0))
			return 29;
		else
			return 28;
	}
	//months which has 31 days
	else if(month == 1 || month == 3 || month == 5 || month == 7 || month == 8
	||month == 10 || month==12)
		return 31;
	else
		return 30;
}
//find what day of week it is
int dayofweek(int d, int m, int y)
{
    static int t[] = { 0, 3, 2, 5, 0, 3,
                       5, 1, 4, 6, 2, 4 };
    y -= m < 3;
    return ( y + y / 4 - y / 100 +
             y / 400 + t[m - 1] + d) % 7;
}

void print(vector<int> const &input)
{
	for (int i = 0; i < input.size(); i++) {
		cout << input.at(i) << ' ';
	}
}
//schedule flights
void schedule (int monthflights, vector<int> &tosched, vector<flight> &flight_list)
{
	for (int x = 0; monthflights>x; x++)
	{
		//build instance of flight
		flight f;
		f.day = tosched.back();
		f.squad = "training";
		//push to flight_list
		flight_list.push_back(f);
		//loop list
		tosched.insert(tosched.begin(),tosched.back());
		tosched.pop_back();
	}
}
//print flight vector
void printst(vector<flight> const &input)
{
	for (int i = 0; i < input.size(); i++) {
		cout << input.at(i).day << ' '<<input.at(i).squad << "\n";
	}
}
