/**********
version 2 js. goes to production.
*/

var userNameSection = $('#menu'); // section to display username

// function to capitalize username
function titleCase(str) {
    if (str !== null) {
        var splitStr = str.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        return splitStr.join(' ');
    }
}


// function to get username and capitalizeU it
function capitalizeUsername(){
  if (localStorage.getItem('user') !== null) {

      var capitalizeStudent = titleCase(localStorage.getItem('user'));

      userNameSection.empty();

      userNameSection.prepend(capitalizeStudent + "&nbsp;&nbsp;");
  }
}
capitalizeUsername()


// function to logout a user
function logout(){
  if (typeof localStorage.getItem('auth') !== 'undefined' && localStorage.getItem('auth') !== null) {

      $('#student-logout').on('click', function() {

          //delete token if available
          localStorage.removeItem('auth');

          localStorage.removeItem('user');

          $('#register-success').empty();

          $('#student-account-section').css('visibility', 'hidden');

          window.location.href = '/exams';
      });
  } else {
      $('#student-account-section').css('visibility', 'hidden');
  }
}

logout()


// Capitalize the first letter in the username
function titleCase(str) {
  if (str !== null) {
      var splitStr = str.toLowerCase().split(' ');
      for (var i = 0; i < splitStr.length; i++) {
          splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
      }
      return splitStr.join(' ');
  }
}


$(function() {

var loadingSubjects = $('.cssload-loader');

// function to fetch all countries
function fetchCountries(){
  $.ajax({

      type: 'GET',
      url: 'api/countries/',
      dataType: 'json',
      success: function(countries) {
          sessionStorage.setItem('countries', JSON.stringify(countries));
      }
  });
}
fetchCountries()


// get current user details

var authentication = localStorage.auth;
if (authentication !== undefined) {
    $.ajax({

        type: 'GET',

        url: 'api/profile/',

        dataType: 'json',

        cache: false,

        headers: {
            'Authorization': "Token " + authentication,
            'Cache-Control': "no-cache"
        },

        success: function(currentStudentDetails) {
            localStorage.setItem('currentStudentDetails', JSON.stringify(currentStudentDetails));
        }

    });
}

// get subjects
//let instructions = new GeneralInstructions();
$.ajax({

    type: 'GET',

    url: 'api/subjects/',

    dataType: 'json',

    success: function(subjects) {

        loadingSubjects.css('visibility', 'hidden');

        $('#footer').css('display', 'none');

        var listOfSubjects = subjects;

        listOfSubjects.reverse();
        var leadWrapper = $('#lead-wrapper');
        leadWrapper.css('text-align', "center");
        leadWrapper.css('font-size', '1.2em');
        leadWrapper.css('line-height', '1.2em');
        leadWrapper.css('margin-top', '30px');

        $('#lead-instruction').html('<span id="choose-paper"></span>');

        $('#choose-paper').css('font-size', '1.4em');

        $('#choose-paper').css('font-weight', 'bold');

        $('#choose-paper').css('color', '#fff');

        $('#choose-paper').append('Choose a subject');

        $.each(listOfSubjects, function(i, subject) {

            var subjectName = subject.name;

            var currentSubject = subject.id;

            var subjectId = i;

            var subjectsList = $('#subjects-list');

            //subjectsList.append(instructions.instruction_template);

            subjectsList.append(

                '<br>' +

                '<button class="btn btn-primary btn-subject" id="subject-' + subjectId + '">' +

                subjectName +

                '</button>' +

                '<br>'

            );


            var subjectBtnId = $('#subject-' + subjectId);

            var leadInstruction = $('#lead-instruction');

            subjectBtnId.on('click', function() {

                leadInstruction.empty();

                subjectsList.empty();


                subjectsList.append(

                    '<div class="cssload-loader" id="loading-exams" style="margin-top: 10%">Loading ' + subjectName + '</div>'

                );

                // create link for  the click subject

                if (screen.width > 768) {

                    var secondSlash = $('#second-slash');

                    secondSlash.append("/");

                    var subjectNameLink = $('#all-subject-exams');

                    subjectNameLink.append('<span class="subject-link-name" id="sub-' + subjectId + '">' + subjectName + '</span>');
                }

                listingExams();

            });


            //start getting papers

            function listingExams() {

                var retrieveExams = sessionStorage.getItem('exams' + currentSubject);

                var storedExams = JSON.parse(retrieveExams);


                if (retrieveExams === null) {
                    $.ajax({

                        type: 'GET',

                        url: 'api/subjects/' + currentSubject,

                        dataType: 'json',

                        success: function(examResponse) {
                            $('#loading-exams').css('visibility', 'hidden');

                            sessionStorage.setItem('exams' + currentSubject, JSON.stringify(examResponse));

                            retrieveExams = sessionStorage.getItem('exams' + currentSubject);

                            storedExams = JSON.parse(retrieveExams);
                            doingExam();

                        }

                    });
                } else {
                    $('#loading-exams').css('visibility', 'hidden');

                    doingExam();

                }

                function doingExam() {

                    storedExams.sort(function(a, b) {
                        var nameA = a.name,
                            nameB = b.name;
                        if (nameA > nameB) //sort string ascending
                            return -1;
                        if (nameA < nameB)
                            return 1;
                        return 0; //default return value (no sorting)
                    });

                    var examObjLength = storedExams.length;

                    if (examObjLength !== 0) {

                        $.each(storedExams, function(i, exam) {

                            var examLength = exam.questions.length;

                            function loading_exam_papers() {
                                var leadWrapper = $('#lead-wrapper');

                                leadWrapper.css('text-align', "center");
                                leadWrapper.css('font-size', '1.2em');
                                leadWrapper.css('line-height', '1.2em');

                                $('#lead-instruction').html('<span id="choose-paper"></span>');

                                $('#choose-paper').css('font-size', '1.4em');

                                $('#choose-paper').css('font-weight', 'bold');

                                $('#choose-paper').css('color', '#fff');

                                $('#choose-paper').append('Choose a paper');
                                // $('#choose-paper').append(`&nbsp;&nbsp;<button
                                //   class="btn btn-primary btn-md btn-buy-credit"
                                //   id="buy-credit">Make Payment</button>`);

                                var examName = exam.name;

                                var currentExam = exam.id;


                                var examId = i;

                                var examsForSubject =

                                    '<br>' +

                                    '<button class="btn btn-primary btn-exam" id="exam-' + examId + '">' +

                                    examName +

                                    '</button>' +

                                    '<br>'


                                ;



                                subjectsList.append(examsForSubject);

                                //var authentication = localStorage.getItem('auth');

                                examToDone = $('#exam-' + examId);


                                examToDone.on('click', function() {
                                    var counter = 0;

                                    if (localStorage.getItem('auth') !== null) {

                                        // get questions for the clicked exam

                                        var questions = storedExams[examId].questions;

                                        // get the exam attempt

                                        $.ajax({

                                            type: 'GET',

                                            url: 'api/attempt/',

                                            dataType: 'json',

                                            success: function(attempt) {

                                                attemptId = attempt;

                                            }

                                        });


                                        subjectsList.html(

                                            '<div class="row">' +

                                            '<div class="col-sm-2">' +

                                            '</div>' +

                                            '<div class="col-sm-8 question-background" style="min-height: 400px;">' +
                                            '<br>' +
                                            '<div class="qn-heading">' + "Question" + '&nbsp;&nbsp;' +
                                            '<span id="question-number">' + '</span>' + '&nbsp;&nbsp;' + "|" + '&nbsp;&nbsp;' + '<span id="timer" style="color: grey; font-weight: lighter; font-size: 1em">' + '</span>' + '</div>' +
                                            '<br>' +
                                            '<div id="question-listing">' + '</div>' +

                                            '</div>' +

                                            '<div class="col-sm-2">' +

                                            '</div>' +

                                            '</div>'

                                        );


                                        //var counter = 0;


                                        // load first question

                                        hashTableTR = new HashTable();

                                        displayCurrent();

                                        var closeText = $('#close-text');
                                        var closeTextResource = closeText.html();
                                        if (closeTextResource !== undefined) {
                                            openText = closeTextResource.match(/_+?\d+_+/);
                                        }

                                        choiceBtnBgColor();

                                        if (numberOfQuestions > 0) {
                                            //load buttons for the first time
                                            createBackNextBtn();


                                            hashTableChoice = new HashTable(); // store the choice by the student

                                            hashTableAnswer = new HashTable(); // store choice status, 1 or 0 ; used for marks calculation

                                            //var currentBtn;

                                            subjectsList.on('click', '.answer-btn', function() {

                                                selectedChoiceId = $(this).attr('id');

                                                answeringQuestion();

                                                hashTableChoice.insert(counter, selectedChoiceId);

                                                hashTableAnswer.insert(counter, choice);


                                            });


                                            // notify and show timer

                                            var timer = $('#timer');


                                            $.notify("Timer started", "success", {
                                                position: "center"
                                            });


                                            timer.timer();

                                            subjectsList.on('click', '#next-btn', function() {

                                                counter++;
                                                if (counter < numberOfQuestions) {

                                                    displayCurrent();
                                                    choiceBtnBgColor();
                                                    closeText = $('#close-text');
                                                    closeTextResource = closeText.html();
                                                    if (closeTextResource !== undefined) {
                                                        openText = closeTextResource.match(/_+?\d+_+/);
                                                    }
                                                    createBackNextBtn();

                                                    //if (counter === numberOfQuestions-1){
                                                    //    nextBtn.html("Get results");
                                                    //}

                                                } else {

                                                    var timeTaken = timer.data('seconds');

                                                    var timeInHours = (new Date()).clearTime().addSeconds(timeTaken).toString('H:mm:ss');


                                                    hashTableChoice.retrieveAll();

                                                    var initialChoiceArray = content[0];


                                                    hashTableAnswer.retrieveAll();

                                                    var initialAnswerArray = content[0];


                                                    var objChoice = {};

                                                    var objAnswer = {};

                                                    if (initialAnswerArray !== undefined || initialChoiceArray !== undefined) {

                                                        initialChoiceArray.forEach(function(data) {

                                                            objChoice[data[0]] = data[1];

                                                        });


                                                        initialAnswerArray.forEach(function(data) {

                                                            objAnswer[data[0]] = data[1];

                                                        });


                                                        /**
                                                        preparing results

                                                        */

                                                        var firstQuestion = 0;

                                                        var lastQuestion = counter;

                                                        var marks = [];

                                                        var questionsGotWrong = []; // missed questions IDs

                                                        var hashTableWrongQuestions = new HashTable(); // missed questions with choices used


                                                        for (var i = firstQuestion; i < lastQuestion + 1; i++) {

                                                            var markValue = hashTableAnswer.retrieve(i);

                                                            marks.push(markValue);

                                                            var wrongChoice = hashTableChoice.retrieve(i);

                                                            questionsGotWrong.push(i);

                                                            hashTableWrongQuestions.insert(i, wrongChoice);



                                                        }


                                                        /**
                                                        summing up for marks scored
                                                        */

                                                        var totalMarks = 0;

                                                        for (var j = 0; j < marks.length; j++) {

                                                            totalMarks += marks[j] << 0;

                                                        }

                                                        /*
                                                        calculate percentage
                                                        */

                                                        var percentageMarks = Math.ceil((totalMarks / numberOfQuestions) * 100);

                                                        /*
                                                        get the questions gotten wrong
                                                        */


                                                        var congratulations = $('.qn-heading');

                                                        congratulations.css('color', '#ed5729');

                                                        var retrieveStudentDetails = localStorage.getItem('currentStudentDetails');

                                                        var response = JSON.parse(retrieveStudentDetails);

                                                        //avatar = response.student[0].avatar;
                                                        //
                                                        //if (avatar === null) {
                                                        //    studentAvatar = 'https://elimufeynman.s3-us-west-2.amazonaws.com/static/exams/images/no-avatar.png';
                                                        //} else {
                                                        //    studentAvatar = avatar;
                                                        //}

                                                        var successMsg = '';

                                                        if (percentageMarks > 74) {
                                                            successMsg = "Excellent";
                                                        } else if (percentageMarks > 59 && percentageMarks < 75) {
                                                            successMsg = "Very Good";
                                                        } else if (percentageMarks > 44 && percentageMarks < 60) {
                                                            successMsg = "Good";
                                                        } else if (percentageMarks > 29 && percentageMarks < 45) {
                                                            successMsg = "Fair";
                                                        } else {
                                                            successMsg = "Nice Try";
                                                        }

                                                        var grade = '';

                                                        if (percentageMarks > 79) {
                                                            grade = 'A';
                                                        } else if (percentageMarks > 74 && percentageMarks < 80) {
                                                            grade = 'A-';
                                                        } else if (percentageMarks > 69 && percentageMarks < 75) {
                                                            grade = 'B+';
                                                        } else if (percentageMarks > 64 && percentageMarks < 70) {
                                                            grade = 'B';
                                                        } else if (percentageMarks > 59 && percentageMarks < 65) {
                                                            grade = 'B-';
                                                        } else if (percentageMarks > 54 && percentageMarks < 60) {
                                                            grade = 'C+';
                                                        } else if (percentageMarks > 49 && percentageMarks < 55) {
                                                            grade = 'C';
                                                        } else if (percentageMarks > 45 && percentageMarks < 50) {
                                                            grade = 'C-';
                                                        } else if (percentageMarks > 39 && percentageMarks < 45) {
                                                            grade = 'D+';
                                                        } else if (percentageMarks > 34 && percentageMarks < 40) {
                                                            grade = 'D';
                                                        } else if (percentageMarks > 29 && percentageMarks < 35) {
                                                            grade = 'D-';
                                                        } else {
                                                            grade = 'E';
                                                        }


                                                        congratulations.html(
                                                            //'<div class="container">'+

                                                            '<div class="row">' +

                                                            '<div class="col-sm-12" style="color: #436bb3;font-weight: bolder; margin-left: auto; margin-right: auto;">' + examName + '</div>' +

                                                            '<br><br>' +

                                                            '<div class="col-sm-2 col-xs-2">' +

                                                            //'<img id="profile-picture" class="img img-responsive img-circle img-profile"  src="' + studentAvatar + '" alt="No profile set">' +

                                                            '</div>' +

                                                            '<div class="col-sm-8 col-xs-8">' +

                                                            '<span style="font-weight: bolder">' + successMsg + '&nbsp;' + titleCase(localStorage.user) + "!" + '</span>' +

                                                            '<br>' +

                                                            '<span class="percentage" style="font-weight: bolder">' + percentageMarks + "%" + '</span>' + '&nbsp;&nbsp;&nbsp;&nbsp;' + '<span class="percentage" style="font-weight: 400">' + grade + '</span>' +
                                                            '<br>' +
                                                            //'<h2 class="scoredOutOf">' + "Your grade is " + '&nbsp;&nbsp;' + grade + '</h2>'+
                                                            '<span class="scoredOutOf" style="font-weight: bolder">' + totalMarks + "/" + numberOfQuestions + '</span>' +
                                                            '&nbsp;' +
                                                            '<span style="font-weight: 400">' + "in" + '</span>' +
                                                            '&nbsp;' +
                                                            '<span style="font-weight: bolder">' + timeInHours + '</span>' +
                                                            '<br>' +
                                                            '<span style="font-size: 1em; color: #436bb3; "><a href="/exams"><span>Take another exam</span></a></span>' +
                                                            '</div>' +

                                                            '<div class="col-sm-2 col-xs-2">' +

                                                            '</div>' +

                                                            '</div>'

                                                            //'</div>'

                                                        );

                                                        var numberOfMissedQuestions = questionsGotWrong.length;

                                                        if (numberOfMissedQuestions !== 0) {

                                                            questionDetailsDiv.html(
                                                                '<div class="row">' +

                                                                '<div class="col-sm-12">' +
                                                                '<p style="color: #436bb3; font-weight: bold; margin-left: auto; margin-right: auto;">' +
                                                                "Check out all the answers " +
                                                                '</p>' +
                                                                '</div>' +
                                                                //'</div>' +
                                                                /*'<div class="col-xs-2"></div>'+
                                                                '<div class="col-xs-5"><p  style="color: #436bb3; font-weight: bold; margin-left: auto; margin-right: auto;">'+
                                                                '<a href="/exams"><span>Take another exam</span></a></p>*/

                                                                '</div>'

                                                            );

                                                            var firstWrongQuestion = 0;

                                                            questions.sort(function(a, b) {

                                                                return a.question_number - b.question_number;

                                                            });
                                                            
                                                            



                                                            for (var x = firstWrongQuestion; x < questions.length; x++) {

                                                                var wrongQuestionDetails = questions[questionsGotWrong[x]];
                                                                console.log(wrongQuestionDetails)


                                                                var replacedQS; //question statement

                                                                // handling images


                                                                var QSImages = wrongQuestionDetails.image_resources[0];

                                                                var QS = wrongQuestionDetails.statement;

                                                                if (QS !== undefined) {

                                                                    if (QSImages !== undefined && QS !== undefined) {

                                                                        var matching = QS.match(/\[resource\:\s\d+,\s\align\:\s\left\]/);

                                                                        replacedQS = QS.replace(matching, '<img src="' + QSImages.avatar + '">');

                                                                    } else {

                                                                        replacedQS = wrongQuestionDetails.statement;

                                                                    }
                                                                }

                                                                var hashedWQ = hashTableWrongQuestions.retrieve(questionsGotWrong[x]);

                                                                if (hashedWQ !== null) {
                                                                    hashedChoice = hashedWQ;

                                                                } else {
                                                                    hashedChoice = hashedWQ;
                                                                }

                                                                var choiceA = wrongQuestionDetails.choices.A;

                                                                var choiceB = wrongQuestionDetails.choices.B;

                                                                var choiceC = wrongQuestionDetails.choices.C;

                                                                var choiceD = wrongQuestionDetails.choices.D;

                                                                // getting images for choices

                                                                var imageChoiceA = wrongQuestionDetails.choices.choices_image[0];

                                                                var imageChoiceB = wrongQuestionDetails.choices.choices_image[1];

                                                                var imageChoiceC = wrongQuestionDetails.choices.choices_image[2];

                                                                var imageChoiceD = wrongQuestionDetails.choices.choices_image[3];

                                                                var choiceImagesHT = new HashTable();

                                                                if (imageChoiceA !== undefined) {

                                                                    var matchingChoiceA = choiceA.match(/\[resource\:\s\d+,\s\align\:\s\left\]/);

                                                                    replacedChoiceA = choiceA.replace(matchingChoiceA, '<img class="img img-responsive" src="' + imageChoiceA.image_url + '">');
                                                                    choiceImagesHT.insert('A', replacedChoiceA);

                                                                } else {
                                                                    replacedChoiceA = choiceA;
                                                                }
                                                                if (imageChoiceB !== undefined) {

                                                                    var matchingChoiceB = choiceB.match(/\[resource\:\s\d+,\s\align\:\s\left\]/);

                                                                    replacedChoiceB = choiceB.replace(matchingChoiceB, '<img class="img img-responsive" src="' + imageChoiceB.image_url + '">');
                                                                    choiceImagesHT.insert('B', replacedChoiceB);
                                                                } else {
                                                                    replacedChoiceB = choiceB;
                                                                }

                                                                if (imageChoiceC !== undefined) {

                                                                    var matchingChoiceC = choiceC.match(/\[resource\:\s\d+,\s\align\:\s\left\]/);

                                                                    replacedChoiceC = choiceC.replace(matchingChoiceC, '<img class="img img-responsive" src="' + imageChoiceC.image_url + '">');
                                                                    choiceImagesHT.insert('C', replacedChoiceC);
                                                                } else {
                                                                    replacedChoiceC = choiceC;
                                                                }
                                                                if (imageChoiceD !== undefined) {

                                                                    var matchingChoiceD = choiceD.match(/\[resource\:\s\d+,\s\align\:\s\left\]/);

                                                                    replacedChoiceD = choiceD.replace(matchingChoiceD, '<img class="img img-responsive" src="' + imageChoiceD.image_url + '">');
                                                                    choiceImagesHT.insert('D', replacedChoiceD);
                                                                } else {
                                                                    replacedChoiceD = choiceD;
                                                                }

                                                                //var stripedQs = QS.replace("<p>", "").replace("</p>", "");

                                                                var correctChoice = wrongQuestionDetails.choices.answer;

                                                                var capCC = correctChoice.toUpperCase();

                                                                var CA = wrongQuestionDetails.choices[capCC];

                                                                CAMatchImage = CA.match(/\[resource\:\s\d+,\s\align\:\s\left\]/);


                                                                if (CAMatchImage !== null) {
                                                                    replacedCA = choiceImagesHT.retrieve(capCC);

                                                                } else {
                                                                    replacedCA = CA.replace("<p>", "").replace("</p>", "");

                                                                }

                                                                //get wrongQuestion choice

                                                                var wrongChoiceQS = wrongQuestionDetails.choices[hashedChoice];


                                                                if (wrongChoiceQS !== undefined) {
                                                                    matchWrongChoiceImage = wrongChoiceQS.match(/\[resource\:\s\d+,\s\align\:\s\left\]/);
                                                                } else {
                                                                    matchWrongChoiceImage = null;
                                                                }

                                                                //console.log(matchWrongChoiceImage);
                                                                var unstriped = wrongChoiceQS;
                                                                var topic = wrongQuestionDetails.topic;

                                                                var topicId;

                                                                var topicTitle;

                                                                if (topic !== null) {
                                                                    topicId = topic.id;
                                                                    topicTitle = topic.title;
                                                                }
                                                                                           
                                                                var chapter = wrongQuestionDetails.topic;

                                                                var chapterId;

                                                                if (chapter !== null) {
                                                                    chapterId = wrongQuestionDetails.topic.chapter;
                                                                }

                                                                if (matchWrongChoiceImage !== null) {
                                                                    answeredWrong = choiceImagesHT.retrieve(hashedChoice);


                                                                } else if (unstriped !== undefined) {


                                                                    var stripped = unstriped.replace("<p>", "").replace("</p>", "");

                                                                    /*#FF7D38*/
                                                                    if (hashTableAnswer.retrieve(x) === 0) {
                                                                        if (subjectName === 'Kiswahili') {
                                                                            answeredWrong = '<span style="color:  #ed5729; font-weight: bold;">' + stripped + '</span>';
                                                                            answeredWrong = 'Jibu lako lilikuwa: &nbsp;&nbsp;' + answeredWrong;
                                                                            replacedCA = 'Jibu sahihi ni :&nbsp;&nbsp;&nbsp;&nbsp;<span class="correct-choice">' + replacedCA + '</span>';
                                                                            learnMore = "Jifunze zaidi kuhusu:" + '&nbsp;&nbsp;' +
                                                                                '<a href="/topic/view/?t=' + topicId + '&c=' + chapterId + ' " id=' + wrongQuestionDetails.id + ' target="_blank">' +
                                                                                topicTitle +
                                                                                '</a>';
                                                                        } else {
                                                                            answeredWrong = '<span style="color:  #ed5729; font-weight: bold;">' + stripped + '</span>';
                                                                            answeredWrong = 'Your answer was: &nbsp;&nbsp;' + answeredWrong;
                                                                            replacedCA = 'The correct answer is:&nbsp;&nbsp;&nbsp;&nbsp;<span class="correct-choice">' + replacedCA + '</span>';
                                                                            learnMore = "Learn more about:" + '&nbsp;&nbsp;' +
                                                                                '<a href="/topic/view/?t=' + topicId + '&c=' + chapterId + ' " id=' + wrongQuestionDetails.id + ' target="_blank">' +
                                                                                topicTitle +
                                                                                '</a>';
                                                                        }

                                                                    } else {
                                                                        if (subjectName === 'Kiswahili') {
                                                                            answeredWrong = '<span style="color: #436bb3; font-weight: bold;">' + stripped + '</span>';
                                                                            answeredWrong = 'Jibu lako lilikuwa: &nbsp;&nbsp;' + answeredWrong;
                                                                            learnMore = "Jifunze zaidi kuhusu:" + '&nbsp;&nbsp;' +
                                                                                '<a href="/topic/view/?t=' + topicId + '&c=' + chapterId + ' " id=' + wrongQuestionDetails.id + ' target="_blank">' +
                                                                                topicTitle +
                                                                                '</a>';
                                                                            replacedCA = 'Jibu sahihi ni :&nbsp;&nbsp;&nbsp;&nbsp;<span class="correct-choice">' + replacedCA + '</span>';

                                                                        } else {
                                                                            answeredWrong = '<span style="color: #436bb3; font-weight: bold;">' + stripped + '</span>';
                                                                            answeredWrong = 'Your answer was: &nbsp;&nbsp;' + answeredWrong;
                                                                            learnMore = "Learn more about:" + '&nbsp;&nbsp;' +
                                                                                '<a href="/topic/view/?t=' + topicId + '&c=' + chapterId + ' " id=' + wrongQuestionDetails.id + ' target="_blank">' +
                                                                                topicTitle +
                                                                                '</a>';
                                                                            replacedCA = 'The correct answer is:&nbsp;&nbsp;&nbsp;&nbsp;<span class="correct-choice">' + replacedCA + '</span>';
                                                                        }
                                                                    }


                                                                } else {
                                                                    if (subjectName === 'Kiswahili') {
                                                                        answeredWrong = '<span tab style="color: red">Hukujaribu swali hili.<span>';

                                                                        learnMore = "Jifunze zaidi kuhusu::" + '&nbsp;&nbsp;' +
                                                                            '<a href="/topic/view/?t=' + topicId + '&c=' + chapterId + ' " id=' + wrongQuestionDetails.id + ' target="_blank">' +
                                                                            topicTitle +
                                                                            '</a>';
                                                                        replacedCA = 'Jibu sahihi ni :&nbsp;&nbsp;&nbsp;&nbsp;<span class="correct-choice">' + replacedCA + '</span>';
                                                                    } else {
                                                                        answeredWrong = '<span tab style="color: red">You skipped this question.<span>';
                                                                        learnMore = "Learn more about:" + '&nbsp;&nbsp;' +
                                                                            '<a href="/topic/view/?t=' + topicId + '&c=' + chapterId + ' " id=' + wrongQuestionDetails.id + ' target="_blank">' +
                                                                            topicTitle +
                                                                            '</a>';
                                                                        replacedCA = 'The correct answer is:&nbsp;&nbsp;&nbsp;&nbsp;<span class="correct-choice">' + replacedCA + '</span>';
                                                                    }
                                                                }



                                                                questionDetailsDiv.append(
                                                                    '<br>'

                                                                );

                                                                if (wrongQuestionDetails.text_resource !== null && wrongQuestionDetails.question_number < 16) {



                                                                    questionDetailsDiv.append(
                                                                        '<div class="wrongQuestionView">' +

                                                                        exam.text_resources[0].statement +

                                                                        '</div>'
                                                                    );
                                                                }
                                                                if (wrongQuestionDetails.text_resource !== null && wrongQuestionDetails.question_number > 25 && wrongQuestionDetails.question_number < 39) {

                                                                    //console.log(exams[i].text_resources);

                                                                    questionDetailsDiv.append(

                                                                        exam.text_resources[1].statement


                                                                    );
                                                                }

                                                                if (wrongQuestionDetails.text_resource !== null && wrongQuestionDetails.question_number > 38 && wrongQuestionDetails.question_number < 51) {

                                                                    //console.log(exams[i].text_resources);

                                                                    questionDetailsDiv.append(

                                                                        exam.text_resources[2].statement


                                                                    );
                                                                }


                                                                //var stripedCA = CA.replace("<p>", "").replace("</p>", "");
                                                                MathJax.Hub.Queue(["Typeset", MathJax.Hub, '#lead-instruction']);

                                                                if (subjectName === "IRE" || subjectName === "CRE" || subjectName === "HRE") {
                                                                    qs_no = wrongQuestionDetails.question_number;

                                                                    qs_no_statement = '<span style="font-weight: bold; margin-top: 5px; margin-bottom: 5px; line-height: 2em;">' +
                                                                        qs_no + '.&nbsp;</span>';

                                                                } else {
                                                                    if (subjectName === "Kiswahili") {
                                                                        qs_no = wrongQuestionDetails.question_number;
                                                                        qs_no_statement = '<span style="font-weight: bold; margin-top: 5px; margin-bottom: 5px; line-height: 2em;">' + qs_no + '.&nbsp;</span>';
                                                                    } else {
                                                                        qs_no = wrongQuestionDetails.question_number;
                                                                        qs_no_statement = '<span style="font-weight: bold; margin-top: 5px; margin-bottom: 5px; line-height: 2em;">' +
                                                                            qs_no + '. &nbsp;</span>';
                                                                    }
                                                                }

                                                                // remove <p> in question stament

                                                                replacedQS = replacedQS.replace("<p>", "").replace("</p>", "");

                                                                var wrongQuestionView =
                                                                    '<div class="wrongQuestionView" >' +

                                                                    qs_no_statement +

                                                                    replacedQS +

                                                                    '<tab>' + replacedChoiceA + '</tab>' +
                                                                    '<tab>' + replacedChoiceB + '</tab>' +
                                                                    '<tab>' + replacedChoiceC + '</tab>' +
                                                                    '<tab>' + replacedChoiceD + '</tab>' +

                                                                    '<div class="wcs">' + answeredWrong + '</div>' +

                                                                    '<div class="wcs">' + replacedCA + '</div>' +

                                                                    '<div style="text-align: right">' + learnMore +
                                                                    '</div>' +
                                                                    '</div>';

                                                                questionDetailsDiv.append(wrongQuestionView);


                                                                //if($('.wrong-choice-section').text() == 'null'){
                                                                //    $('.wcs').css('display', 'none');
                                                                //}
                                                            }

                                                            // take another exam bottom

                                                            questionDetailsDiv.append('<br><div style="text-align: "right""><span style="font-size: 1.2em; color: #436bb3; "><a href="/exams"><span>Take another exam</span></a></span></div>');


                                                            var currentUser = localStorage.user;
                                                            var currentAuth = localStorage.auth;

                                                            var resultObj = {
                                                                exam: currentExam,
                                                                subject: currentSubject,
                                                                attempt: attemptId,
                                                                marks: percentageMarks,
                                                                time_taken: timeTaken,
                                                                user: currentUser,

                                                            };

                                                            console.log(resultObj);

                                                            // submit results

                                                            $.ajax({

                                                                type: 'POST',

                                                                url: 'api/save-results/',

                                                                data: resultObj,

                                                                dataType: 'json',

                                                                headers: {
                                                                    'Authorization': "Token " + currentAuth,
                                                                },
                                                                success: function(result) {

                                                                    console.log(result);


                                                                },
                                                                error: function() {
                                                                    alert("Sorry, a fatal, error occured");
                                                                }
                                                            });



                                                        } else {
                                                            questionDetailsDiv.html("");
                                                        }

                                                    } else {

                                                        alert("No questions taken");
                                                    }
                                                    // reset variables

                                                    //counter = 0;



                                                }


                                            });

                                            choiceBtnBgColor();
                                            subjectsList.on('click', '#back-btn', function() {
                                                counter = counter - 1;

                                                displayCurrent();

                                                choiceBtnBgColor();

                                                createBackNextBtn();

                                            });



                                        } else {

                                            questionNumber.append("Sorry, no questions set for this exam");

                                        }


                                        //exams[i].text_resources.reverse();
                                        function displayCurrent() {

                                            // don't understand why double reverse  works

                                            reversedQuestions = questions.reverse();

                                            reversedQuestions.reverse();

                                            reversedQuestions.sort(function(a, b) {

                                                return a.question_number - b.question_number;

                                            });

                                            numberOfQuestions = Object.keys(questions).length;

                                            //var examNameHashTag = '#' + examName;
                                            //
                                            //history.pushState(null, null, examNameHashTag);

                                            leadInstruction.html('');

                                            questionDetailsDiv = $('#question-listing');

                                            questionNumber = $('#question-number');

                                            //var currentQuestion = counter + 1;

                                            var questionImages = questions[counter].image_resources[0];


                                            if (questionImages !== undefined) {

                                                var questionStatement = reversedQuestions[counter].statement;

                                                var matching = questionStatement.match(/\[resource\:\s\d+,\s\align\:\s\left\]/);

                                                replacedStatement = questionStatement.replace(matching, '<img src="' + questionImages.avatar + '"  alt="image not loaded">');

                                            } else {

                                                replacedStatement = reversedQuestions[counter].statement;

                                            }


                                            questionNumber.html(

                                                reversedQuestions[counter].question_number + '&nbsp;&nbsp;' + "of" + '&nbsp;&nbsp;' + numberOfQuestions

                                            );
                                            if (subjectName === "IRE" || subjectName === "CRE" || subjectName === "HRE") {
                                                no_of_questions = 60 + parseInt(numberOfQuestions);
                                                questionNumber.html(

                                                    reversedQuestions[counter].question_number + '&nbsp;&nbsp;' + "of" + '&nbsp;&nbsp;' + no_of_questions

                                                );

                                            } else {

                                                questionNumber.html(

                                                    reversedQuestions[counter].question_number + '&nbsp;&nbsp;' + "of" + '&nbsp;&nbsp;' + numberOfQuestions

                                                );
                                            }
                                            questionDetailsDiv.empty();

                                            if (reversedQuestions[counter].text_resource !== null && reversedQuestions[counter].question_number < 16) {

                                                //console.log(exams[i].text_resources);

                                                storedTR = hashTableTR.retrieve(storedExams[i].text_resources[0].id);

                                                if (storedTR === null) {

                                                    trId = storedExams[i].text_resources[0].id;

                                                    trStatement = storedExams[i].text_resources[0].statement;

                                                    hashTableTR.insert(trId, trStatement);

                                                    questionDetailsDiv.append(

                                                        '<div id="close-text">' + hashTableTR.retrieve(trId) + '</div>'

                                                    );

                                                } else {
                                                    questionDetailsDiv.append(

                                                        '<div id="close-text">' + hashTableTR.retrieve(trId) + '</div>'

                                                    );
                                                }


                                            }
                                            if (reversedQuestions[counter].text_resource !== null && reversedQuestions[counter].question_number > 25 && reversedQuestions[counter].question_number < 39) {

                                                //console.log(exams[i].text_resources);

                                                questionDetailsDiv.append(

                                                    storedExams[i].text_resources[1].statement


                                                );
                                            }

                                            if (reversedQuestions[counter].text_resource !== null && reversedQuestions[counter].question_number > 38 && reversedQuestions[counter].question_number < 51) {

                                                //console.log(exams[i].text_resources);

                                                questionDetailsDiv.append(

                                                    storedExams[i].text_resources[2].statement


                                                );
                                            }
                                            questionDetailsDiv.append(
                                                replacedStatement
                                                //reversedQuestions[counter].statement

                                            );

                                            MathJax.Hub.Queue(["Typeset", MathJax.Hub, '#lead-instruction']);

                                            // get the answers for the question


                                            choicesObj = reversedQuestions[counter].choices;


                                            var imagesInChoices = choicesObj.choices_image;

                                            var stringA = choicesObj.A;

                                            var stripedA = stringA.replace("<p>", "").replace("</p>", "");

                                            var stringB = choicesObj.B;

                                            var stripedB = stringB.replace("<p>", "").replace("</p>", "");

                                            var stringC = choicesObj.C;

                                            var stripedC = stringC.replace("<p>", "").replace("</p>", "");

                                            var stringD = choicesObj.D;

                                            var stripedD = stringD.replace("<p>", "").replace("</p>", "");

                                            // dealing with images

                                            var imageA = imagesInChoices[0];

                                            var imageB = imagesInChoices[1];

                                            var imageC = imagesInChoices[2];

                                            var imageD = imagesInChoices[3];

                                            if (imageA !== undefined) {
                                                var matchingA = stripedA.match(/\[resource\:\s\d+,\s\align\:\s\left\]/);

                                                replacedA = stripedA.replace(matchingA, '<img class="img img-responsive" src="' + imageA.image_url + '">');
                                            } else {
                                                replacedA = stripedA;
                                            }

                                            if (imageB !== undefined) {
                                                var matchingB = stripedB.match(/\[resource\:\s\d+,\s\align\:\s\left\]/);

                                                replacedB = stripedB.replace(matchingB, '<img class="img img-responsive" src="' + imageB.image_url + '">');
                                            } else {
                                                replacedB = stripedB;
                                            }
                                            if (imageC !== undefined) {
                                                var matchingC = stripedC.match(/\[resource\:\s\d+,\s\align\:\s\left\]/);

                                                replacedC = stripedC.replace(matchingC, '<img class="img img-responsive" src="' + imageC.image_url + '">');
                                            } else {
                                                replacedC = stripedC;
                                            }
                                            if (imageD !== undefined) {
                                                var matchingD = stripedD.match(/\[resource\:\s\d+,\s\align\:\s\left\]/);

                                                replacedD = stripedD.replace(matchingD, '<img class="img img-responsive" src="' + imageD.image_url + '">');
                                            } else {
                                                replacedD = stripedD;
                                            }

                                            var answers_content =

                                                '<div class="answer-btn" id="A">' + replacedA + '</div>' +

                                                '<div class="answer-btn" id="B">' + replacedB + '</div>' +

                                                '<div class="answer-btn" id="C">' + replacedC + '</div>' +

                                                '<div class="answer-btn" id="D">' + replacedD + '</div>'

                                            ;

                                            questionDetailsDiv.append(answers_content);

                                            MathJax.Hub.Queue(["Typeset", MathJax.Hub, '#lead-instruction']);

                                            wheelzoom(document.querySelectorAll('img'), {
                                                zoom: 0.05
                                            });

                                        }


                                        function choiceBtnBgColor() {
                                            $('#A').on('click', function() {
                                                if (closeTextResource !== undefined) {
                                                    closeTextResource = closeTextResource.replace(openText, $(this).text());
                                                    openText = $(this).text();
                                                    hashTableTR.insert(trId, closeTextResource);
                                                    closeText.html(hashTableTR.retrieve(trId));

                                                }

                                                $(this).css('background-color', '#6bc8c4');
                                                $('#B').css('background-color', '#436bb3');
                                                $('#C').css('background-color', '#436bb3');
                                                $('#D').css('background-color', '#436bb3');
                                            });
                                            $('#B').on('click', function() {

                                                if (closeTextResource !== undefined) {
                                                    closeTextResource = closeTextResource.replace(openText, $(this).text());
                                                    openText = $(this).text();
                                                    hashTableTR.insert(trId, closeTextResource);
                                                    closeText.html(hashTableTR.retrieve(trId));

                                                }

                                                $(this).css('background-color', '#6bc8c4');
                                                $('#A').css('background-color', '#436bb3');
                                                $('#C').css('background-color', '#436bb3');
                                                $('#D').css('background-color', '#436bb3');
                                            });
                                            $('#C').on('click', function() {

                                                if (closeTextResource !== undefined) {
                                                    closeTextResource = closeTextResource.replace(openText, $(this).text());
                                                    openText = $(this).text();
                                                    hashTableTR.insert(trId, closeTextResource);
                                                    closeText.html(hashTableTR.retrieve(trId));

                                                }

                                                $(this).css('background-color', '#6bc8c4');
                                                $('#B').css('background-color', '#436bb3');
                                                $('#A').css('background-color', '#436bb3');
                                                $('#D').css('background-color', '#436bb3');
                                            });
                                            $('#D').on('click', function() {

                                                if (closeTextResource !== undefined) {
                                                    closeTextResource = closeTextResource.replace(openText, $(this).text());
                                                    openText = $(this).text();

                                                    hashTableTR.insert(trId, closeTextResource);
                                                    closeText.html(hashTableTR.retrieve(trId));

                                                }

                                                $(this).css('background-color', '#6bc8c4');
                                                $('#B').css('background-color', '#436bb3');
                                                $('#C').css('background-color', '#436bb3');
                                                $('#A').css('background-color', '#436bb3');
                                            });
                                        }

                                        function createBackNextBtn() {

                                            // append navigation buttons

                                            var buttons = '<div class="row  btn-alignment">' +

                                                '<div class="col-sm-4 col-xs-4">' +

                                                '<div class="btn" id="back-btn">' +
                                                '<img class="img-responsive btn-img" src="https://elimufeynman.s3-us-west-2.amazonaws.com/static/exams/images/back-arrow-orange-144.png">' + '</div>' +

                                                '</div>' +

                                                '<div class="col-sm-4 col-xs-4 timing" style="font-size: .8em; color: #000">' +

                                                examName +

                                                '</div>' +

                                                '<div class="col-sm-4 col-xs-4 ">' +

                                                '<div class="btn" id="next-btn">' +
                                                '<img class="img-responsive btn-img" src="https://elimufeynman.s3-us-west-2.amazonaws.com/static/exams/images/next-arrow-orange-144.png">' + '</div>' +

                                                '</div>' +

                                                '</div>';

                                            questionDetailsDiv.append(buttons);


                                            nextBtn = $('#next-btn');

                                            backBtn = $('#back-btn');

                                            if (counter === 0) {

                                                backBtn.css('visibility', 'hidden');

                                            }
                                            $('input[name="answer"]').attr('checked', false);

                                        }

                                        function answeringQuestion() {

                                            var correctChoice = choicesObj.answer;

                                            correctChoice = correctChoice.toUpperCase();

                                            if (correctChoice == selectedChoiceId) {

                                                choice = 1;

                                            } else {

                                                choice = 0;

                                            }



                                        }


                                    } else {


                                        subjectsList.append(
                                            '<div class="modal fade" id="login-modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none; height: auto; overflow: scroll">' +
                                            '<div class="modal-dialog">' +
                                            '<div class="modal-content">' +
                                            '<div class="modal-header" align="center">' +
                                            '<img class="img-circle" id="img_logo" src="/static/exams/images/unlock.png">' +
                                            '<button type="button" class="close" data-dismiss="modal" aria-label="Close" style="margin-top: -105px;">' +
                                            '<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' +
                                            '</button>' +
                                            '</div>' +

                                            '<div id="div-forms">' +

                                            '<form id="login-form">' +
                                            '<div class="modal-body">' +
                                            '<div id="div-login-msg" style="height: auto;">' +
                                            '<div id="icon-login-msg" class="glyphicon glyphicon-chevron-right"></div>' +
                                            '<span id="text-login-msg">Type your username and password.</span>' +
                                            '</div>' +

                                            '<input id="login-username" class="form-control" type="text" placeholder="Your username" required>' +
                                            '<input id="login-password" class="form-control" type="password" placeholder="Your password" required style="margin-bottom: 8%">' +

                                            '</div>' +
                                            '<div class="modal-footer">' +
                                            '<div>' +
                                            '<button type="submit" class="btn btn-primary btn-lg btn-block">Enter</button>' +
                                            '</div>' +
                                            '<div>' +
                                            '<button id="login_lost_btn" type="button" class="btn btn-link">Lost Password?</button>' +
                                            '<button id="login_register_btn" type="button" class="btn btn-link">Register</button>' +
                                            '</div>' +
                                            '</div>' +
                                            '</form>' +

                                            '<form id="lost-form" style="display:none;">' +
                                            '<div class="modal-body">' +
                                            '<div id="div-lost-msg" style="height: auto;">' +
                                            '<div id="icon-lost-msg" class="glyphicon glyphicon-chevron-right"></div>' +
                                            ' <span id="text-lost-msg">Type your e-mail.</span>' +
                                            '</div>' +
                                            '<input id="lost_email" class="form-control" type="email" placeholder="E-mail" required style="margin-bottom: 8%">' +
                                            '</div>' +
                                            '<div class="modal-footer">' +
                                            '<div>' +

                                            '<button type="submit" class="btn btn-primary btn-lg btn-block">Send</button>' +
                                            '</div>' +
                                            '<div>' +
                                            '<button id="lost_login_btn" type="button" class="btn btn-link">Log In</button>' +
                                            '<button id="lost_register_btn" type="button" class="btn btn-link">Register</button>' +
                                            '</div>' +
                                            '</div>' +
                                            '</form>' +



                                            '<form id="register-form" style="display:none;">' +
                                            '<div class="modal-body">' +
                                            '<div id="div-register-msg" style="height: auto;">' +
                                            '<div id="icon-register-msg" class="glyphicon glyphicon-chevron-right"></div>' +
                                            '<span id="text-register-msg">Register to compete with other students.</span>' +
                                            '</div>' +
                                            '<input id="register_username" class="form-control" type="text" placeholder="Type a username e.g johnjuma" required>' +
                                            '<input id="register_email_phone" class="form-control " type="text" placeholder="Email or phone number" required>' +
                                            '<input  id="register_password" class="form-control" type="password" placeholder="Your password">' +
                                            '<input id="confirm_register_password" class="form-control" type="password" placeholder="Confirm password" required style="margin-bottom: 8%">' +
                                            '</div>' +


                                            '<div class="modal-footer">' +
                                            '<div>' +
                                            '<button type="submit" class="btn btn-primary btn-lg btn-block">Start!</button>' +
                                            '</div>' +
                                            '<div>' +
                                            '<button id="register_login_btn" type="button" class="btn btn-link">Log In</button>' +
                                            '<button id="register_lost_btn" type="button" class="btn btn-link">Lost Password?</button>' +
                                            '</div>' +
                                            '</div>' +
                                            '</form>' +

                                            '</div>' +

                                            '</div>' +
                                            '</div>' +
                                            '</div>'
                                        );

                                        $(document).ready($('#login-modal').modal('show'));


                                        /*
                                         login functionality
                                         */

                                        var loginFormContent = $('#login-form');

                                        loginFormContent.on('submit', function(e) {

                                            e.preventDefault();

                                            var studentUsername = $('#login-username').val();

                                            var studentPassword = $('#login-password').val();

                                            var loginCredentials = {

                                                username: studentUsername.toLowerCase(),

                                                password: studentPassword
                                            };


                                            $.ajax({

                                                type: 'POST',

                                                url: 'api/login/',

                                                data: JSON.stringify(loginCredentials),

                                                contentType: "application/json",

                                                success: function(loginCredentials) {

                                                    $('#login-form-content').each(function() {

                                                        this.reset();

                                                    });
                                                    $('#student-account-section').show();

                                                    localStorage.setItem('user', loginCredentials.username.toLowerCase());

                                                    localStorage.setItem('auth', loginCredentials.key);

                                                    function titleCase(str) {
                                                        if (str !== null) {
                                                            var splitStr = str.toLowerCase().split(' ');
                                                            for (var i = 0; i < splitStr.length; i++) {
                                                                splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
                                                            }
                                                            return splitStr.join(' ');
                                                        }
                                                    }

                                                    var userNameSection = $('#menu');

                                                    if (localStorage.getItem('user') !== undefined) {

                                                        var capitalizeStudent = titleCase(localStorage.getItem('user'));
                                                        userNameSection.prepend(capitalizeStudent + "&nbsp;&nbsp;");
                                                    }

                                                    $('#student-account-section').css('visibility', 'visible');

                                                    //window.location.href = '/exams';
                                                    $(document).ready($('#login-modal').modal('toggle'));
                                                    if (localStorage.getItem('auth') !== null) {
                                                        $('#student-account-section').css('visibility', 'visible');

                                                        $('#student-logout').on('click', function() {

                                                            localStorage.removeItem('auth');

                                                            localStorage.removeItem('user');

                                                            $('#student-account-section').css('visibility', 'hidden');

                                                            window.location.href = '/exams';
                                                        });
                                                    }
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
                                                    toastr.success("Please click on an exam to continue.");


                                                },
                                                error: function(loginErrors) {

                                                    var content = JSON.parse(loginErrors.responseText);

                                                    var loginErrorsDiv = $('#div-login-msg');


                                                    $('#div-login-msg').html(content.failed);
                                                    loginErrorsDiv.css("color", "#000");
                                                }

                                            });

                                        });
                                        // end login


                                        // sign up process starts here

                                        var signUpForm = $('#register-form');

                                        signUpForm.on('submit', function(e) {

                                            e.preventDefault();

                                            var signUpErrors = $('#div-register-msg');
                                            signUpErrors.css("color", "#000");


                                            function passwordConfirmation() {


                                                var password = $('#register_password').val();

                                                var confirmPassword = $('#confirm_register_password').val();

                                                var passwordLength = $('#register_password').val().length;



                                                if (password !== confirmPassword) {

                                                    signUpErrors.html(

                                                        "Sorry, passwords do not match."
                                                    );

                                                } else if (passwordLength < 4) {
                                                    signUpErrors.html(

                                                        "Sorry, password set is too short."

                                                    );

                                                } else {

                                                    var uName = $('#register_username').val();


                                                    var user_name = uName.toLowerCase();

                                                    if (user_name.match(/\s/g)) {

                                                        $('#div-register-msg').html(

                                                            "Sorry, your username should not have spaces."

                                                        );
                                                    } else {
                                                        user_name = uName.toLowerCase();
                                                    }

                                                    studentObj = {

                                                        username: user_name,

                                                        email_phone: $('#register_email_phone').val(),

                                                        password: $('#register_password').val(),                                                        

                                                    };


                                                    $.ajax({

                                                        type: 'POST',

                                                        url: 'api/register/',

                                                        data: studentObj,

                                                        dataType: 'json',

                                                        cache: false,

                                                        success: function() {
                                                            loginCredentials = {

                                                                username: user_name,

                                                                password: $('#register_password').val()
                                                            };
                                                            $.ajax({

                                                                type: 'POST',

                                                                url: 'api/login/',

                                                                data: JSON.stringify(loginCredentials),

                                                                contentType: "application/json",

                                                                success: function(loginCredentials) {

                                                                    localStorage.setItem('user', loginCredentials.username.toLowerCase());

                                                                    localStorage.setItem('auth', loginCredentials.key);

                                                                    function titleCase(str) {
                                                                        if (str !== null) {
                                                                            var splitStr = str.toLowerCase().split(' ');
                                                                            for (var i = 0; i < splitStr.length; i++) {
                                                                                splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
                                                                            }
                                                                            return splitStr.join(' ');
                                                                        }
                                                                    }


                                                                    if (localStorage.getItem('auth') !== null) {

                                                                        var userNameSection = $('#menu');

                                                                        if (localStorage.getItem('user') !== undefined) {

                                                                            var capitalizeStudent = titleCase(localStorage.getItem('user'));
                                                                            userNameSection.prepend(capitalizeStudent + "&nbsp;&nbsp;");
                                                                        }
                                                                        $('#student-account-section').css('visibility', 'visible');

                                                                        $('#student-logout').on('click', function() {

                                                                            localStorage.removeItem('auth');

                                                                            localStorage.removeItem('user');

                                                                            $('#student-account-section').css('visibility', 'hidden');

                                                                            window.location.href = '/exams';
                                                                        });
                                                                    }


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
                                                                    toastr.success("Please click on an exam to continue.");


                                                                }


                                                            });
                                                            $(document).ready($('#login-modal').modal('toggle'));


                                                        },

                                                        error: function(errors) {

                                                            var responseContent = JSON.parse(errors.responseText);

                                                            signUpErrors.html(responseContent.error);


                                                        }

                                                    });

                                                }

                                            }

                                            passwordConfirmation();

                                        });

                                    } //end else

                                });
                            }


                            if (examLength === exam.number_of_questions && exam.preview === true) {
                                loading_exam_papers();

                            } else if (examLength !== 0 && localStorage.getItem('user') !== null && localStorage.getItem('user') === 'maintest') {
                                loading_exam_papers();
                            }


                        });



                    } else {

                        leadInstruction.html(
                            '<span class="no-exams">' +

                            "Sorry, no exams set for " + '&nbsp;' + subjectName +

                            '</span>'

                        );
                    }
                }



            }

        });
    }


});


});


// handling csrf
$(function() {

// This function gets cookie with a given name
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
var csrftoken = getCookie('csrftoken');

/*
The functions below will create a header with csrftoken
*/

function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

function sameOrigin(url) {
    // test that a given url is a same-origin URL
    // url could be relative or scheme relative or absolute
    var host = document.location.host; // host + port
    var protocol = document.location.protocol;
    var sr_origin = '//' + host;
    var origin = protocol + sr_origin;
    // Allow absolute or scheme relative URLs to same origin
    return (url == origin || url.slice(0, origin.length + 1) == origin + '/') ||
        (url == sr_origin || url.slice(0, sr_origin.length + 1) == sr_origin + '/') ||
        // or any other URL that isn't scheme relative or absolute i.e relative.
        !(/^(\/\/|http:|https:).*/.test(url));
}

$.ajaxSetup({
    beforeSend: function(xhr, settings) {
        if (!csrfSafeMethod(settings.type) && sameOrigin(settings.url)) {
            // Send the token to same-origin, relative URLs only.
            // Send the token only if the method warrants CSRF protection
            // Using the CSRFToken value acquired earlier
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    }
});

});
