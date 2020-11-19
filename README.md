# Interview Scheduler Api
## REST interface for interview scheduler system in Nodejs and Mongodb

### Endpoints in the api
* POST:**/api/new-interview/**: An endpoint to a new schedule for a interview
  * name: Name of a interview
  * date: Date of the interview
  * starttime: Time(hh:mm format for ex: 15:30) when interview starts
  * endtime: Time when interview ends
* POST:**/api/update-interview/**: An endpoint to update date/timings/add-delete participants in an interview
  * name: Updated name of a interview
  * date: Updated date of the interview
  * starttime: Updated time when interview starts
  * endtime: Updated time when interview ends
* GET:**/api/interviews/**: An endpoint all upcoming interviews
