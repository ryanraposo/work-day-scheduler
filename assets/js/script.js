function updateTimeBlockColors() {
    const hour = moment().hour();
    var timeBlocks = document.getElementsByClassName("time-block");
    for(var i = 0; i < timeBlocks.length; i++)
    {
        const timeBlock = timeBlocks[i]
        const timeBlockHour = parseInt(timeBlock.parentElement.id);

        timeBlock.classList.remove("past", "future", "present");

        if (timeBlockHour === hour) {
            timeBlock.classList.add("present");
        }
        else if (timeBlockHour < hour) {
            timeBlock.classList.add("past");
        }
        else if (timeBlockHour > hour) {
            timeBlock.classList.add("future")
        }
    }
}

function loadSchedule() {
    var timeBlocks = document.getElementsByClassName("time-block");
    for(var i = 0; i < timeBlocks.length; i++) {
        const hour = timeBlocks[i].parentElement.id;
        const textFromStorage = localStorage.getItem(hour);
        const row = $(`#${hour}`);
        row.children(".time-block").text(textFromStorage);
    };
}

function displayCurrentDay() {
    const currentDayText = $("#currentDay");
    currentDayText.text(moment().format("dddd, MMMM Do YYYY"));
} 

$(document).on({
    'click': function () {
        const text = $(this).text().trim();
    
        var textInput = $("<textarea>")
        .addClass("time-block")
        .addClass("col-8")
        .val(text);
    
        $(this).replaceWith(textInput);
        updateTimeBlockColors();
        textInput.trigger("focus");
    },
    'blur': function () {
        var text = $(this).val().trim();
    
        var p = $("<p>")
            .addClass("time-block")
            .addClass("col-8")
            .text(text);
        
        $(this).replaceWith(p);
        updateTimeBlockColors();
    }
}, '.time-block');


$(document).on({
    "click": function () {
        const hour = $(this).parent().attr("id");
        const text = $(this).parent().children(".time-block").text().trim();
        localStorage.setItem(hour, text)
}}, '.saveBtn');

window.onload = () => {
    displayCurrentDay();
    updateTimeBlockColors();
    loadSchedule();
};
