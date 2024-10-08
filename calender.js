
// Select the "Select Time & Date" button and calendar popup
const dateBookingButton = document.getElementById('datebooking');
const calendarPopup = document.querySelector('.calendarPopup');
const selectBtn = document.querySelector('.selectbtn');
const displayDate = document.getElementById('display_date');
const hiddenDate = document.getElementById('hidden_date'); 

// Correctly assign the days element
const daysEl = document.getElementById('days');
const monthYearEl = document.getElementById('monthYear');

let currentMonth = new Date().getMonth(); // Get the current month (0-11)
let currentYear = new Date().getFullYear(); // Get the current year
let selectedDayNumber = null;  // To store the selected day
let selectedMonth = currentMonth;  // Initialize with current month
let selectedYear = currentYear;    // Initialize with current year

// Add click event listener to the "Select Time & Date" button
dateBookingButton.addEventListener('click', function (event) {
    event.preventDefault();  // Prevent form submission
    calendarPopup.classList.remove('hidden');
    displayDate.textContent= '';
    
});

// Add click event listener to the "Close" button in the calendar popup
const closeButton = document.querySelector('.close');
closeButton.addEventListener('click', function () {
    calendarPopup.classList.add('hidden');  // Hide the calendar popup

});

function renderCalendar(month, year) {
    const lastDay = new Date(year, month + 1, 0).getDate(); // Last day of the current month
    const firstDay = new Date(year, month, 1).getDay(); // First day of the current month (0-6)

    // Clear previous days
    daysEl.innerHTML = '';

    // Set month and year in the header
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    monthYearEl.textContent = `${monthNames[month]} ${year}`;

    // Empty cells for days before the 1st of the month
    for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.classList.add('day', 'empty');
        daysEl.appendChild(emptyCell);
    }

    // Add days of the month
    for (let day = 1; day <= lastDay; day++) {
        const dayCell = document.createElement('div');
        dayCell.classList.add('day');
        dayCell.textContent = day;

        // Add click event listener to each day
        dayCell.addEventListener('click', function () {
            // Remove the 'selected' class from any previously selected day
            const selectedDay = document.querySelector('.day.selected');
            if (selectedDay) {
                selectedDay.classList.remove('selected');
            }

            // Add the 'selected' class to the clicked day
            dayCell.classList.add('selected');

            // Store the selected day, month, and year
            selectedDayNumber = day; 
            selectedMonth = month; 
            selectedYear = year; 
        });

        daysEl.appendChild(dayCell);
    }
}

// Previous month button event
document.querySelector('.prevBtn').addEventListener('click', () => {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    renderCalendar(currentMonth, currentYear);
});

// Next month button event
document.querySelector('.nextBtn').addEventListener('click', () => {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    renderCalendar(currentMonth, currentYear);
});

// Add click event listener to the "Select" button
selectBtn.addEventListener('click', function () {
    if (selectedDayNumber !== null) {
        // Format the date as DD/MM/YYYY
        const formattedDate = `${String(selectedDayNumber).padStart(2, '0')}/${String(selectedMonth + 1).padStart(2, '0')}/${selectedYear}`;
        
        // Display the selected date in the <p> tag
        displayDate.textContent = formattedDate;

        hiddenDate.value = formattedDate;
        // Hide the calendar popup after selecting the date
        calendarPopup.classList.add('hidden');
    } else {
        // Optionally, handle the case where no date was selected
        alert('Please select a date.');
    }
});

// Render the current month when the page loads
renderCalendar(currentMonth, currentYear);
