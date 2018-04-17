/**
user management
**/
$(document).ready(function() {


    function getStudentProfile(){
        var retrieveStudentDetails = localStorage.getItem('currentStudentDetails');
        var response = JSON.parse(retrieveStudentDetails);
        console.log(response);    
        id = response.user[0].id;
        student_id = response.student[0].id;
        username = response.user[0].username;
        first_name = response.user[0].first_name;
        last_name = response.user[0].last_name;
        email = response.user[0].email;
        phone_number = response.student[0].phone_number;

        if(phone_number !== null){
            phone_number = "0"+phone_number.substring(4);
        }else{
            phone_number = "None";
        }

        if (response.student[0].country !== null){
            country = response.student[0].country.code;
            country_name = response.student[0].country.name;
        }else{
            console.log("null");
            country = "";
            country_name = "";
        }

        if (response.student[0].county !== null){
            county = response.student[0].county.id;
            county_name = response.student[0].county.name;
        }else{
            county = '';
            county_name = '';
        }
        if(response.student[0].school !== null){
            school = response.student[0].school.id;
            school_name = response.student[0].school.name;
        }else{
            school = '';
            school_name = '';
        }
        gender = response.student[0].gender;

        dateOfBirth = response.student[0].date_of_birth;


        if(dateOfBirth === null){
            dateOfBirth = "dd-mm-yyyy";
        }else{

            var newdate = dateOfBirth.split("-");

            dateOfBirth = newdate[2]+"-"+newdate[1]+"-"+newdate[0];

        }

        }


    var studentAccount = $('#student-account');
    studentAccount.on('click', function() {

        var leadWrapper = $('#lead-wrapper');

        leadWrapper.css('text-align', "center");

        leadWrapper.css('font-size', '1.2em');
        leadWrapper.css('line-height', '1.2em');
        leadWrapper.css('background-color', '#f0f0dc');
        leadWrapper.css('margin-top', '0');
       $('#lead-instruction').html('<span id="choose-paper"></span>');
       $('#choose-paper').css('background-color', '#f0f0dc');
       $('#choose-paper').css('font-size', '1.4em');

       $('#choose-paper').css('font-weight', 'bold');

       $('#choose-paper').css('color', '#000');

       //$('#choose-paper').css('margin-top', '15px');

       $('#choose-paper').append('<p style="margin-top: 15px">My Account Details</p>');

        var accountUpdate = $('#subjects-list');

        accountUpdate.empty();

        $('body').css('background-color', '#f0f0dc');

        accountUpdate.css('padding-left', '10%');

        accountUpdate.css('height', 'auto');

        getStudentProfile();

        $('#subjects-list').css('background-color', '#f0f0dc');
        accountUpdate.append(

                              '<br>'+

                             '<div class="col-xs-12" style="color: #303030; background-color: #f0f0dc">'+
                             '<div class="col-xs-12 text-danger text-center" id="update-error"></div>'+
                             '<form class="form-horizontal" id="update-form" enctype="multipart/form-data">' +

                             '<div class="form-group">'+
                                '<label for="username" class="col-sm-3 control-label" ">Username</label>'+
                                '<div class="col-sm-6">'+
                                    '<input type="text" id="username" value='+username+' class="form-control" autofocus>'+
                                    '<span class="help-block">Username can contain any letters or numbers, without spaces</span>'+
                                '</div>'+
                            '</div>'+
                            '<div class="form-group">'+
                                '<label for="first_name" class="col-sm-3 control-label" ">First name</label>'+
                                '<div class="col-sm-6">'+
                                    '<input type="text" id="first_name" value='+first_name+' class="form-control">'+
                                    '<span class="help-block">First name can contain any letters or numbers, without spaces</span>'+
                                '</div>'+
                            '</div>'+
                            '<div class="form-group">'+
                                '<label for="last_name" class="col-sm-3 control-label" ">Last name</label>'+
                                '<div class="col-sm-6">'+
                                    '<input type="text" id="last_name" value='+last_name+' class="form-control">'+
                                    '<span class="help-block">Last name can contain any letters or numbers, without spaces</span>'+
                                '</div>'+
                            '</div>'+
                            '<div class="form-group">'+
                                '<label for="email" class="col-sm-3 control-label" ">Email</label>'+
                                '<div class="col-sm-6">'+
                                    '<input type="type" id="email" value='+email+' class="form-control">'+

                                '</div>'+
                            '</div>'+
                            '<div class="form-group">'+
                                '<label for="phone_number" class="col-sm-3 control-label" ">Mobile number</label>'+
                                '<div class="col-sm-6">'+
                                    '<input type="text" id="phone_number" value='+phone_number+' class="form-control">'+

                                '</div>'+
                            '</div>'+

                            '<div class="form-group">'+
                                '<label for="date_of_birth" class="col-sm-3 control-label" ">Date of birth</label>'+
                                '<div class="col-sm-6">'+

                                    '<input type="text" name="date_of_birth" id="date_of_birth" value='+dateOfBirth+' class="form-control">'+

                                '</div>'+
                            '</div>'+

                            '<div class="form-group">'+
                                '<label class="control-label col-sm-3">Gender</label>'+
                                '<div class="col-sm-6">'+
                                    '<div class="row">'+
                                        '<div class="col-sm-4">'+
                                            '<label class="radio-inline">'+
                                                '<input type="radio" name="gender" id="boy" value="M">Boy'+
                                            '</label>'+
                                        '</div>'+
                                        '<div class="col-sm-4">'+
                                           '<label class="radio-inline">'+
                                                '<input type="radio" name="gender" id="girl" value="F">Girl'+
                                            '</label>'+
                                        '</div>'+
                                        '<div class="col-sm-4" hidden>'+
                                            '<label class="radio-inline">'+
                                                '<input type="radio" id="uncknownRadio" value="Unknown">Unknown'+
                                            '</label>'+
                                        '</div>'+
                                    '</div>'+
                                '</div>'+
                            '</div> '+


                            '<div class="form-group">'+
                                '<label for="country" class="col-sm-3 control-label">Country</label>'+
                                '<div class="col-sm-6">'+
                                    '<select id="country" name="country" class="col-sm-12">'+
                                        '<option value='+country+' selected>' + country_name + '</option>' +
                                    '</select>'+
                                '</div>'+
                            '</div>'+

                            '<div class="form-group">'+
                                '<label for="county" class="col-sm-3 control-label">County</label>'+
                                '<div class="col-sm-6">'+
                                    '<select id="county" name="county" class="col-sm-12">'+
                                        '<option value='+county+' selected>' + county_name + '</option>' +
                                    '</select>'+
                                '</div>'+
                            '</div>'+

                            '<div class="form-group">'+
                                '<label for="school"  class="col-sm-3 control-label">School</label>'+
                                '<div class="col-sm-6">'+
                                    '<select id="school" name="school" class="col-sm-12">'+
                                        '<option value='+school+' selected>' + school_name + '</option>' +
                                    '</select>'+
                                '</div>'+
                            '</div>'+

                            '<div class="form-group">'+
                                '<div class="col-sm-3 col-sm-offset-4">'+
                                    '<button type="submit" class="btn btn-primary btn-block">Update!</button>'+
                                '</div>'+
                            '</div>'+

                             '</form>'+

                             '</div>'


                             );
        // update gender after loading

        if(gender !== null){
            if(gender === 'M'){
                $("#boy").prop("checked", true);
            }else{
                $("#girl").prop("checked", true);
            }
        }

        // populate countries

        var countrySelect = $('select[name=country]');

        countrySelect.select2();
        $('select[name=county]').select2();
        $('select[name=school]').select2();

        countrySelect.empty();
        countrySelect.append('<option value=""></option>');

        var retrieveCountries = sessionStorage.getItem('countries');

        var countriesObject = JSON.parse(retrieveCountries);

        var objLength = Object.keys(countriesObject).length;

        var countryString = "";

        for (var i = 0; i < objLength; i++) {

            var countryCode = countriesObject[i].code;

            var countryName = countriesObject[i].name;

            countryString += '<option value="' + countryCode + '">' + countryName + '</option>';

        }

        countrySelect.append(countryString); // end populating countries

        // populating counties

        var hashTableCountries = new HashTable();

        $.each(countriesObject, function(c, countryObj) {

              countrySelected = $('select[name=country]');

             hashTableCountries.insert(countryObj.code, countryObj.counties);


        });

        var hashTableCounties = new HashTable();

        var country_val = country;

        var  county_val = county;

        var  school_val = school;


        countrySelected.on('change', function() {

              var countryCode = $(this).val();

              var countySelect = $('select[name=county]');

              countySelect.empty();
              countySelect.append('<option value=""></option>');

             var counties = hashTableCountries.retrieve(countryCode);

            if (counties.length !== 0) {

                var countyString = "";

                $.each(counties, function(county, countyObj) {

                    var countyId = countyObj.id;

                    var countyName = countyObj.name;

                    hashTableCounties.insert(countyId, countyObj.schools);

                    countyString += '<option value="' + countyId + '">' + countyName + '</option>';

                });

                countySelect.append(countyString);

            }
        country_val = $('select[name=country]').val();

        });

        $('select[name=county]').on('change', function() {

            var countyCode = $(this).val();

            var schoolSelect = $('select[name=school]');

            schoolSelect.empty();

            schoolSelect.append('<option value=""></option>');

            var schools = hashTableCounties.retrieve(parseInt(countyCode));

            var schoolString = "";

            if (schools.length !== 0) {
                $.each(schools, function(s, schoolObj) {

                    var schoolId = schoolObj.id;

                    var schoolName = schoolObj.name;

                    schoolString += '<option value="' + schoolId + '">' + schoolName + '</option>';

                });
            }

            schoolSelect.append(schoolString);
            county_val = $('select[name=county]').val();
        });

        $('select[name=school]').on('change', function() {
           school_val = $('select[name=school]').val();
           });

        var $jqDate = jQuery('input[name="date_of_birth"]');

        $jqDate.bind('keyup','keydown', function(e){
            if(e.which !== 8) {
                var numChars = $jqDate.val().length;
                if(numChars === 2 || numChars === 5){
                    var thisVal = $jqDate.val();
                    thisVal += '-';
                    $jqDate.val(thisVal);
                }
          }
        });

        $('#update-form').on('submit', function(e){
            e.preventDefault();


            var newdate2 = "";

            var newdate = $('#date_of_birth').val().split("-");

            newdate2 = newdate[2]+"-"+newdate[1]+"-"+newdate[0];


            var gender_val = $('input[name="gender"]:checked').val();

            if(typeof $('input[name="gender"]:checked').val() === 'undefined'){
                gender_val = "";
                }

                data = {
                    'username': $('#username').val(),
                    'first_name': $('#first_name').val(),
                    'last_name': $('#last_name').val(),
                    'email': $('#email').val(),
                    'phone_number': $('#phone_number').val(),
                    'country': country_val,
                    'county': county_val,
                    'school': school_val,
                    'gender': gender_val,
                    'date_of_birth': newdate2,

                };
                console.log(data);
                $.ajax({
                    type: 'PUT',

                    url: 'api/register/'+id,

                    data: data,

                    dataType: 'json',

                    success: function(){

                        toastr.options = {
                            "closeButton": true,
                            "debug": true,
                            "newestOnTop": true,
                            "progressBar": false,
                            "positionClass": "toast-top-center",
                            "preventDuplicates": true,
                            "showDuration": "300",
                            "hideDuration": "1000",
                            "timeOut": "5000",
                            "extendedTimeOut": 0,
                            "showEasing": "swing",
                            "hideEasing": "linear",
                            "showMethod": "fadeIn",
                            "hideMethod": "fadeOut",
                            "tapToDismiss": true
                          };
                        toastr.success("Your account has been updated successfully!");
                        window.location.href = '/exams';
                    },
                    error: function(errors){
                        var responseContent = JSON.parse(errors.responseText);

                        //$('#update-error').html(responseContent.error);
                        toastr.options = {
                            "closeButton": true,
                            "debug": true,
                            "newestOnTop": true,
                            "progressBar": false,
                            "positionClass": "toast-top-center",
                            "preventDuplicates": true,
                            "showDuration": "300",
                            "hideDuration": "1000",
                            "timeOut": "5000",
                            "extendedTimeOut": 0,
                            "showEasing": "swing",
                            "hideEasing": "linear",
                            "showMethod": "fadeIn",
                            "hideMethod": "fadeOut",
                            "tapToDismiss": true
                          };
                        toastr.error(responseContent.error);
                    }
                    });

            });


    });

    // feedback form

    var studentFeedback = $('#student-feedback');

    studentFeedback.on('click', function(){

        var leadWrapper = $('#lead-wrapper');

        $('body').css('background-color', '#f0f0dc');
        leadWrapper.css('text-align', "center");
        leadWrapper.css('font-size', '1.2em');
        leadWrapper.css('line-height', '1.2em');
        leadWrapper.css('margin-top', '0');
        $('#lead-instruction').html('<p style="margin-top: 15px"><span id="contact-us"></span></p>');

        $('#contact-us').css('font-size', '1.4em');

        $('#contact-us').css('font-weight', 'bold');

        $('#contact-us').append('Contact us');

        $('#lead-instruction').append('<br>How are you using eLimu?<br>'+
                                    'Have you got any suggestions?<br>'+
                                    'Let us know how we can make things even better!'
                                    );

        var feedback = $('#subjects-list');

        feedback.empty();


        feedback.css('height', 'auto');

        feedback.css('min-height', '480px');

        feedback.css('padding-left', '5%');

        feedback.append('<br><div class="row">'+
                             '<div class="col-sm-1" id="subjects"></div>'+
                             '<div class="col-sm-8" id="feedback-form"></div>'+
                             '<div class="col-sm-3"></div>'+
                             '</div>');

        var feedbackForm = $('#feedback-form');

        feedbackForm.append(
                            '<div class="row">'+
                            '<div class="col-md-12">'+
                            '<div class="col-md-3">'+

                            '</div>'+
                            '<div class="col-md-8">'+
                            '<span class="text-danger" id="message-errors"></span>'+

                            '<form class="form-horizontal" id="message-form" enctype="multipart/form-data">'+
                            '<div class="row">'+
                            '<div class="col-md-12">'+
                            '<textarea class="form-control" rows="10" id="message-textarea" placeholder="Type your message here"></textarea>'+
                            '</div>'+
                            '</div>'+
                            '<br>'+
                            '<div class="row">' +
                            '<div class="col-md-4"></div>'+

                            '<div class="col-md-4">' +

                            '<input type="submit" value="Send" class="btn btn-primary btn-signup-submit">' +

                            '</div>' +

                            '<div class="col-md-4"></div>'+

                            '</div>' +

                            '</form>'+
                            '</div>'+
                            '<div class="col-md-1">'+

                            '</div>'+
                            '</div>'+
                            '</div>'
                            );

        $('#message-form').on('submit', function(e){
            e.preventDefault();

            authentication = localStorage.getItem('auth');

            if ($('#message-textarea').val() === ""){
                $('#message-errors').html('Hey, you just tried to send us a blank message<br>');
            }else{
                $('#message-errors').empty();

                $.ajax({
                type: 'POST',
                url: 'api/feedback/',
                dataType: 'json',
                headers: {
                    'Authorization': "Token " + authentication,
                },
                data: {
                    'message': $('#message-textarea').val(),

                    },
                success: function(){
                    $('#message-form').each(function() {

                            this.reset();

                        });

                    toastr.options = {
                    "closeButton": true,
                    "debug": true,
                    "newestOnTop": true,
                    "progressBar": true,
                    "positionClass": "toast-top-center",
                    "preventDuplicates": true,
                    "showDuration": "300",
                    "hideDuration": "1000",
                    "timeOut": 0,
                    "extendedTimeOut": 0,
                    "showEasing": "swing",
                    "hideEasing": "linear",
                    "showMethod": "fadeIn",
                    "hideMethod": "fadeOut",
                    "tapToDismiss": false
                  };
                    toastr.info('Thank you for your feedback &nbsp;'+localStorage.getItem('user'));

                },
                error: function(errors){
                    var responseContent = JSON.parse(errors.responseText);

                    $('#message-errors').html(responseContent.error);
                }
            });
            }


            });


        });



    // student performance

    //var studentPerformance = $();
    $(document).on('click', '#student-performance', function(e) {
        e.preventDefault();
        var retrieveStudentDetails = localStorage.getItem('currentStudentDetails');
        var response = JSON.parse(retrieveStudentDetails);

        if (response.student[0].country !== null || response.student[0].county !== null || response.student[0].school !== null){
             var leadWrapper = $('#lead-wrapper');

            leadWrapper.css('text-align', "center");
            leadWrapper.css('font-size', '1.2em');
            leadWrapper.css('line-height', '1.2em');
            $('body').css('background-color', '#f0f0dc');
            leadWrapper.css('margin-top', '0');
           $('#lead-instruction').html('<span id="choose-paper"></span>');

           $('#choose-paper').css('font-size', '1.4em');
           $('#choose-paper').css('background-color', '#f0f0dc');

           $('#choose-paper').css('font-weight', 'bold');

           $('#choose-paper').css('color', '#000');

           $('#choose-paper').append('<p class="text-center" style="margin-top: 15px">My Performance</p>');

            var accountUpdate = $('#subjects-list');

            accountUpdate.empty();

            accountUpdate.css('background-color', '#f0f0dc');

            accountUpdate.css('height', 'auto');

            accountUpdate.css('min-height', '480px');

            accountUpdate.css('padding-left', '5%');

            accountUpdate.append('<br><div class="row">'+
                                 '<div class="col-sm-3" id="subjects"></div>'+
                                 '<div class="col-sm-7 text-center" id="exam-results"></div>'+
                                 '<div class="col-sm-2"></div>'+
                                 '</div>');

            $.ajax({
                type: 'GET',
                url: 'api/subjects/',
                dataType: 'json',
                cache: true,
                success: function(subjects) {
                    var authentication = localStorage.auth;

                    subjects.reverse();

                    var subjectsList = $('#subjects');

                    var examResults = $('#exam-results');

                    examResults.append('<h4 id="subject-title" style="color: #303030; text-decoration: underline;"></h4>');
                    examResults.append(
                                       '<div id="exams-ranking" style="display: none;">'+

                                        //'<div class="row">'+
                                        //
                                        //'<div class="col-sm-12 text-center" style="margin-top: 1%">'+
                                        //
                                        //'<span class="exams-ranking-title">'+"Your ranking"+'</span>'+
                                        //
                                        //'</div>'+
                                        //
                                        //'</div>'+



                                        '<div class="row">'+

                                        '<div class="col-sm-3" id="exams">'+

                                        '</div>'+

                                        '<div class="col-sm-9">'+

                                        '<div class="row">'+

                                        '<div class="col-sm-4">'+

                                        '<div class="col-sm-12" id="country-label">'+

                                        '<h4 style="color: #ed5729">Country</h4>'+

                                        '</div>'+

                                        '<div class="row">'+

                                        '<div class="col-sm-12">'+

                                        '<div id="country-graph">'+

                                        '</div>'+

                                        '</div>'+

                                        '</div>'+

                                        '</div>'+


                                        '<div class="col-sm-4">'+

                                        '<div class="col-sm-12" id="county-label">'+

                                        '<h4 style="color: #ed5729">County</h4>'+

                                        '</div>'+

                                        // gragh goes here

                                        '<div class="row">'+

                                        '<div class="col-sm-12">'+

                                        '<div id="county-graph">'+

                                        '</div>'+

                                        '</div>'+

                                        '</div>'+

                                        '</div>'+

                                        '<div class="col-sm-4">'+

                                        '<div class="col-sm-12" id="school-label">'+

                                        '<h4 style="color: #ed5729">School</h4>'+

                                        '</div>'+

                                        // gragh goes here

                                        '<div class="row">'+

                                        '<div class="col-sm-12">'+

                                        '<div id="school-graph">'+

                                        '</div>'+

                                        '</div>'+

                                        '</div>'+

                                        '</div>'+

                                        // end main row

                                        '</div>'+

                                        '</div>'+

                                        '</div>'+

                                        '</div>'

                                       );
                    examResults.append('<table id="score-table" class="table table-sm table-responsive table-striped table-hover">'+'</table>');
                    var scoreTable = $('#score-table');
                    scoreTable.css('text-align', 'center');
                    scoreTable.append(

                                    '<thead>'+

                                        '<tr style="color: #303030">'+
                                          '<th style="text-align: center">'+"Date"+'</th>'+

                                          '<th style="text-align: center">'+"Exam"+'</th>'+

                                          '<th style="text-align: center">'+"Score %"+'</th>'+

                                          '<th style="text-align: center">'+"Time"+'</th>'+


                                        '</tr>'+

                                    '</thead>'

                                );
                    scoreTable.append('<tbody id="score-body">'+'</tbody>');

                    var scoreBody = $('#score-body');
                    scoreBody.append("<h3 style='color: #ed5729; text-align: center;'>Click a subject on the left to view performance</h3>");
                    subjectsList.append('<br><br><br><br><table class="table table-hover table-responsive table-content" id="list-of-subjects"></table>');
                    $.each(subjects, function(i, subject){
                        subjectId = subject.id;
                        var subjectName = subject.name;

                        $('#list-of-subjects').append('<tr><td id="'+subjectId+'" class="td-subject">'+subjectName+'</td></tr>');

                        var clickedSubject = $("#"+subjectId);
                        var examsRanking = $('#exams-ranking');
                        clickedSubject.on('click', function(){

                            $.ajax({
                                type: 'POST',
                                url: 'api/performance/',
                                dataType: 'json',
                                headers: {
                                    'Authorization': "Token " + authentication,
                                },
                                data: {
                                    'subject_id': clickedSubject.attr('id'),

                                    },
                                success: function(results){
                                    var exam_results = results.exams_results;

                                    var exams = results.exams;

                                    var hashedExam = new HashTable();


                                    $.each(exams, function(i, exam){

                                        hashedExam.insert(exam.id, exam.name);

                                        });

                                    scoreBody.empty();

                                    $('#subject-title').html("My "+clickedSubject.text()+" ranking");

                                        $.each(exam_results, function(i, exam_result){

                                        var timeSeconds = exam_result.time_taken;

                                        var timeHours = (new Date()).clearTime().addSeconds(timeSeconds).toString('H:mm:ss');
                                        var sdate = exam_result.date_submited.substring(10,0);
                                        sdate1 = new Date(sdate);

                                        scoreBody.append('<tr id='+exam_result.attempt+' class='+exam_result.exam_id+'>'+
                                                         '<td class="td-1">'+(String(sdate1).substring(15, 3))+'</td>'+
                                                         '<td class="td-2">'+hashedExam.retrieve(exam_result.exam_id)+'</td>'+

                                                         '<td class="td-1" >'+ exam_result.marks+'</td>'+

                                                         '<td class="td-2">'+timeHours+'</td>'+


                                                          '</tr>');

                                        var clickedAttempt = $('#'+exam_result.attempt);


                                        clickedAttempt.on('click', function(){

                                            $.ajax({

                                                type: 'POST',

                                                url: 'api/rank/',

                                                dataType: 'json',
                                                headers: {
                                                    'Authorization': "Token " + localStorage.auth,
                                                },

                                                data: {'user': localStorage.user, 'attempt': clickedAttempt.attr('id'), 'exam': clickedAttempt.attr('class')},

                                                success: function(content){
                                                    //console.log(content);
                                                    var countryGraph = $('#country-graph');

                                                    var countyGraph = $('#county-graph');

                                                    var schoolGraph = $('#school-graph');

                                                    // country graph reprentation

                                                    var country_percentage = content.country;

                                                    var textInfo = "";

                                                    var color = "";

                                                    if (country_percentage < 51){

                                                        country_percentage = content.country;


                                                        if (country_percentage < 15){

                                                            textInfo = "TOP";

                                                            color ="#82bc00";

                                                        }
                                                        else if (country_percentage < 31){

                                                            textInfo = "TOP";

                                                            color ="#3fc08d";

                                                        }

                                                        else if (country_percentage < 51){

                                                            textInfo = "TOP";

                                                            color ="#436bb3";
                                                        }
                                                    }

                                                    else{

                                                        country_percentage = 100-content.country;

                                                        if (country_percentage < 1){

                                                            country_percentage = country_percentage + 5;

                                                        }

                                                        if (country_percentage < 49){

                                                            textInfo = "BOTTOM";

                                                            color ="#f55959";

                                                        }

                                                        else if(country_percentage < 30){

                                                            textInfo = "BOTTOM";

                                                            color ="#F73E3E";

                                                        }

                                                        else {

                                                            textInfo = "BOTTOM";

                                                            color ="#ed0202";

                                                        }

                                                    }


                                                    // county graph reprentation

                                                    var county_percentage = content.county;

                                                    var countyTextInfo = "";

                                                    var countyColor = "";

                                                    if (county_percentage < 51){

                                                        county_percentage = content.county;


                                                        if (county_percentage < 15){

                                                            countyTextInfo = "TOP";

                                                            countyColor ="#82bc00";

                                                        }
                                                        else if (county_percentage < 31){

                                                            countyTextInfo = "TOP";

                                                            countyColor ="#3fc08d";
                                                        }

                                                        else if (county_percentage < 51){

                                                            countyTextInfo = "TOP";

                                                            countyColor ="#436bb3";

                                                        }
                                                    }

                                                    else{

                                                        county_percentage = 100-content.county;

                                                        if (county_percentage < 1){

                                                            county_percentage = county_percentage + 5;

                                                        }

                                                        if (county_percentage < 49){

                                                            countyTextInfo = "BOTTOM";

                                                            countyColor ="#f55959";

                                                        }

                                                        else if(county_percentage < 30){

                                                            countyTextInfo = "BOTTOM";

                                                            countyColor ="#F73E3E";

                                                        }

                                                        else {

                                                            countyTextInfo = "BOTTOM";

                                                            countyColor ="#ed0202";

                                                        }

                                                    }

                                                    // county graph reprentation

                                                    var school_percentage = content.school;

                                                    var schoolTextInfo = "";

                                                    var schoolColor = "";

                                                    if (school_percentage < 51){

                                                        school_percentage = content.school;


                                                        if (school_percentage < 15){

                                                            schoolTextInfo = "TOP";

                                                            schoolColor ="#82bc00";

                                                        }
                                                        else if (school_percentage < 31){

                                                            schoolTextInfo = "TOP";

                                                            schoolColor ="#3fc08d";
                                                        }

                                                        else if (school_percentage < 51){

                                                            schoolTextInfo = "TOP";

                                                            schoolColor ="#436bb3";

                                                        }
                                                    }

                                                    else{

                                                        school_percentage = 100-content.school;

                                                        if (school_percentage < 1 ){

                                                            school_percentage = school_percentage + 5;

                                                        }

                                                        if (school_percentage < 49){

                                                            schoolTextInfo = "BOTTOM";

                                                            schoolColor ="#f55959";

                                                        }

                                                        else if(school_percentage < 30){

                                                            schoolTextInfo = "BOTTOM";

                                                            schoolColor ="#F73E3E";

                                                        }

                                                        else {

                                                            schoolTextInfo = "BOTTOM";

                                                            schoolColor ="#ed0202";

                                                        }

                                                    }


                                                    countryGraph.empty();
                                                    countyGraph.empty();
                                                    schoolGraph.empty();

                                                    // creating a graph circle

                                                    countryGraph.circliful({

                                                        animationStep: 5,

                                                        foregroundBorderWidth: 10,

                                                        backgroundBorderWidth: 25,

                                                        percent: country_percentage,

                                                        text: textInfo,

                                                        textBelow: false,

                                                        foregroundColor: color,
                                                        fontColor: '#303030',

                                                        textColor: '#436bb3',

                                                        });

                                                    countyGraph.circliful({

                                                        animationStep: 5,

                                                        foregroundBorderWidth: 10,

                                                        backgroundBorderWidth: 25,

                                                        percent: county_percentage,

                                                        text: countyTextInfo,

                                                        textBelow: false,

                                                        foregroundColor: countyColor,
                                                        fontColor: '#303030',

                                                        textColor: '#436bb3',

                                                        });

                                                    schoolGraph.circliful({

                                                        animationStep: 5,

                                                        foregroundBorderWidth: 10,

                                                        backgroundBorderWidth: 25,

                                                        fontColor: '#303030',

                                                        textColor: '#436bb3',

                                                        percent: school_percentage,

                                                        text: schoolTextInfo,

                                                        textBelow: false,

                                                        foregroundColor: schoolColor,

                                                        });
                                                },
                                                error: function(errors){
                                                    var responseContent = JSON.parse(errors.responseText);

                                                    toastr.options = {
                                                        "closeButton": true,
                                                        "debug": true,
                                                        "newestOnTop": true,
                                                        "progressBar": false,
                                                        "positionClass": "toast-top-center",
                                                        "preventDuplicates": true,
                                                        "showDuration": "300",
                                                        "hideDuration": "1000",
                                                        "timeOut": "5000",
                                                        "extendedTimeOut": 0,
                                                        "showEasing": "swing",
                                                        "hideEasing": "linear",
                                                        "showMethod": "fadeIn",
                                                        "hideMethod": "fadeOut",
                                                        "tapToDismiss": true
                                                      };
                                                    toastr.error(responseContent.error);
                                                }

                                                });

                                            examsRanking.show();
                                            //console.log($(this).attr('id'));
                                            });

                                        });
                                        accountUpdate.append('<p id="hr"></p>');
                                        $('#hr').empty();
                                        $('#hr').append('<hr style="border-color: #303030;">');
                                        $('#hr').append('<hr style="border-color: #303030;">');


                                },
                                error: function(){
                                    examsRanking.hide();
                                    scoreBody.html("<h3 style='color: #ed5729;'>You have not attempted any&nbsp;"+clickedSubject.text()+"&nbsp;paper</h3>");

                                }

                                });
                            });

                        });



                }

            });
        }else{

            getStudentProfile();

            $('#subjects-list').append('<div class="modal fade" id="login-modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none; height: auto; overflow: scroll">'+
                    '<div class="modal-dialog">'+
                        '<div class="modal-content">'+
                            '<div class="modal-header" align="center">'+
                                '<img class="img-circle" id="img_logo" src="/static/exams/images/signup1.png">'+
                                '<button type="button" class="close" data-dismiss="modal" aria-label="Close" style="margin-top: -105px;">'+
                                    '<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>'+
                                '</button>'+
                            '</div>'+

                            '<div id="div-forms">'+

                                '<form id="update-performance-form">'+
                                    '<div class="modal-body">'+
                                        '<div id="div-lost-msg" style="height: auto;">'+
                                            '<div id="icon-lost-msg" class="glyphicon glyphicon-chevron-right"></div>'+
                                           ' <span id="text-lost-msg">Select Country, County and School.</span>'+
                                        '</div>'+
                                        '<br>'+
                                        '<div class="form-group">'+
                                        //'<label for="country" class="col-sm-3 control-label">Country</label>'+
                                        '<div class="col-sm-12">'+
                                            '<select id="country" name="country" class="col-sm-12">'+
                                                '<option value='+country+' selected>' + country_name + '</option>' +
                                            '</select>'+
                                        '</div>'+
                                    '</div>'+
                                    '<br>'+
                                    '<div class="form-group">'+
                                        //'<label for="county" class="col-sm-3 control-label">County</label>'+
                                        '<div class="col-sm-12">'+
                                            '<select id="county" name="county" class="col-sm-12">'+
                                                '<option value='+county+' selected>' + county_name + '</option>' +
                                            '</select>'+
                                        '</div>'+
                                    '</div>'+
                                    '<br>'+
                                    '<div class="form-group">'+
                                        //'<label for="school"  class="col-sm-3 control-label">School</label>'+
                                        '<div class="col-sm-12">'+
                                            '<select id="school" name="school" class="col-sm-12">'+
                                                '<option value='+school+' selected>' + school_name + '</option>' +
                                            '</select>'+
                                        '</div>'+
                                    '</div>'+

                                    '</div>'+

                                    '<div class="modal-footer" >'+
                                        '<div class="col-sm-6">'+
                                        '<br>'+
                                            '<button type="submit" class="btn btn-primary btn-md btn-block" style="margin-left: 55%;">Send</button>'+
                                        '</div>'+

                                    '</div>'+
                                '</form>'+




                            '</div>'+

                        '</div>'+
                    '</div>'+
                '</div>' );

            $(document).ready($('#login-modal').modal('show'));

            var countrySelect = $('select[name=country]');

            countrySelect.select2();
            $('select[name=county]').select2();
            $('select[name=school]').select2();

            countrySelect.empty();
            countrySelect.append('<option value=""></option>');

            var retrieveCountries = sessionStorage.getItem('countries');

            var countriesObject = JSON.parse(retrieveCountries);

            var objLength = Object.keys(countriesObject).length;

            var countryString = "";

            for (var i = 0; i < objLength; i++) {

                var countryCode = countriesObject[i].code;

                var countryName = countriesObject[i].name;

                countryString += '<option value="' + countryCode + '">' + countryName + '</option>';

            }

            countrySelect.append(countryString); // end populating countries

            // populating counties

            var hashTableCountries = new HashTable();

            $.each(countriesObject, function(c, countryObj) {

                  countrySelected = $('select[name=country]');

                 hashTableCountries.insert(countryObj.code, countryObj.counties);


            });

            var hashTableCounties = new HashTable();

            var country_val = country;

            var  county_val = county;

            var  school_val = school;


            countrySelected.on('change', function() {

                  var countryCode = $(this).val();

                  var countySelect = $('select[name=county]');

                  countySelect.empty();
                  countySelect.append('<option value=""></option>');

                 var counties = hashTableCountries.retrieve(countryCode);

                if (counties.length !== 0) {

                    var countyString = "";

                    $.each(counties, function(county, countyObj) {

                        var countyId = countyObj.id;

                        var countyName = countyObj.name;

                        hashTableCounties.insert(countyId, countyObj.schools);

                        countyString += '<option value="' + countyId + '">' + countyName + '</option>';

                    });

                    countySelect.append(countyString);

                }
            country_val = $('select[name=country]').val();

            });

            $('select[name=county]').on('change', function() {

                var countyCode = $(this).val();

                var schoolSelect = $('select[name=school]');

                schoolSelect.empty();

                schoolSelect.append('<option value=""></option>');

                var schools = hashTableCounties.retrieve(parseInt(countyCode));

                var schoolString = "";

                if (schools.length !== 0) {
                    $.each(schools, function(s, schoolObj) {

                        var schoolId = schoolObj.id;

                        var schoolName = schoolObj.name;

                        schoolString += '<option value="' + schoolId + '">' + schoolName + '</option>';

                    });
                }

                schoolSelect.append(schoolString);
                county_val = $('select[name=county]').val();
            });

            $('select[name=school]').on('change', function() {
               school_val = $('select[name=school]').val();
               });

        $('#update-performance-form').on('submit', function(e){
            e.preventDefault();
                if (gender !== null){
                    gender_val = gender;
                    }else{
                        gender_val = 'M';
                        }
                data = {
                    'username': username,
                    'first_name': first_name,
                    'last_name': last_name,
                    'email': email,
                    'phone_number': '0712345678',
                    'country': country_val,
                    'county': county_val,
                    'school': school_val,
                    'gender': gender_val,
                    'date_of_birth': '2000-01-01',

                };


                $.ajax({
                    type: 'PUT',

                    url: 'api/register/'+id,

                    data: data,

                    headers: {
                     'Authorization': "Token " + localStorage.auth,
                     'Cache-Control': "no-cache"
                    },

                    dataType: 'json',

                    success: function(){

                        toastr.options = {
                            "closeButton": true,
                            "debug": true,
                            "newestOnTop": true,
                            "progressBar": false,
                            "positionClass": "toast-top-right",
                            "preventDuplicates": true,
                            "showDuration": "300",
                            "hideDuration": "1000",
                            "timeOut": "5000",
                            "extendedTimeOut": 0,
                            "showEasing": "swing",
                            "hideEasing": "linear",
                            "showMethod": "fadeIn",
                            "hideMethod": "fadeOut",
                            "tapToDismiss": true
                          };
                        toastr.success("Your account has been updated successfully!");
                        window.location.href = '/exams';
                    },
                    error: function(errors){
                        var responseContent = JSON.parse(errors.responseText);

                        //$('#update-error').html(responseContent.error);
                        toastr.options = {
                            "closeButton": true,
                            "debug": true,
                            "newestOnTop": true,
                            "progressBar": false,
                            "positionClass": "toast-top-center",
                            "preventDuplicates": true,
                            "showDuration": "300",
                            "hideDuration": "1000",
                            "timeOut": "5000",
                            "extendedTimeOut": 0,
                            "showEasing": "swing",
                            "hideEasing": "linear",
                            "showMethod": "fadeIn",
                            "hideMethod": "fadeOut",
                            "tapToDismiss": true
                          };
                        toastr.error(responseContent.error);
                    }
                    });

            });

        }



    });

});
