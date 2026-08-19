// =====================================================
// STUDENT LIST
// =====================================================

const students = [

    "AJITH PRINCE JACKSON R",
    "AKASH I",
    "ANGU KARUPPASAMY P",
    "CHARAN KRISHNA G B",
    "DINESH KUMAR K S",
    "GOKUL K",
    "HARIHARAN S",
    "JASHWANTH S",
    "JEGATHEESH V",
    "JULIAN CYRIL D",
    "KALIF AHAMED S",
    "KAVINKUMAR M",
    "LENIN ROY S",
    "MADHUSUDHANAN N A",
    "MOHAMED ANAS H",
    "MOHAMED SHAFIL M",
    "MOHAMMED AKRAM A",
    "MOHAMMED ANSAR M",
    "PAUL GIFTSON D",
    "PRAVEEN KUMAR L",
    "RAM PRASATH M",
    "RAMMBALAJI G",
    "RAMNARESH R",
    "RIZAL M V",
    "SARVESH TS",
    "THANGAPANDIAN E",
    "UGESH A",
    "VENKATA SUBRAMANIAN A",
    "YOGESHWARAN R",
    "YUGESH R",
    "YUVARAJ P",

    "AARTHY M",
    "ANGELINA CELINE MARY S",
    "ASWINI S",
    "ATCHYA V",
    "BRINDHA T",
    "BUSHRA A",
    "DEEPIKA N",
    "DHANISKA SRI L P",
    "DHANYA B",
    "ESWARI M",
    "GAYATHRI G (15.03.2007)",
    "GAYATHRI G (11.04.2007)",
    "GOMATHI A A",
    "HAESAH JUMAANAH A",
    "HARISHMA NEOMIE ROSE G",
    "HARITHA K",
    "LAKSHANYA P",
    "MONIKA THAVASRI S",
    "POOJASREE S",
    "POORNA SHREE B",
    "RITHIGA SRI S",
    "SANGAVI G",
    "SHALINI A",
    "SHERLY F",
    "SOFIA FARHANA H",
    "SOUNDHARYA LAXHMI V",
    "SRI ABINAYA S",
    "SWATHI N",
    "SWETHA R"

];


// =====================================================
// LOCAL STORAGE KEY
// =====================================================

const STORAGE_KEY =
    "rammbalaji_attendance_history";


// =====================================================
// ATTENDANCE STATUS
// =====================================================
//
// 0 = Not Marked
// 1 = Present
// 2 = Absent
// 3 = On Duty
//
// =====================================================

let attendance = {};


// =====================================================
// DOM ELEMENTS
// =====================================================

const welcomePage =
    document.getElementById(
        "welcomePage"
    );


const attendancePage =
    document.getElementById(
        "attendancePage"
    );


const startBtn =
    document.getElementById(
        "startBtn"
    );


const backBtn =
    document.getElementById(
        "backBtn"
    );


const reloadBtn =
    document.getElementById(
        "reloadBtn"
    );


const historyBtn =
    document.getElementById(
        "historyBtn"
    );


const saveBtn =
    document.getElementById(
        "saveBtn"
    );


const resetBtn =
    document.getElementById(
        "resetBtn"
    );


const searchInput =
    document.getElementById(
        "searchInput"
    );


const historyDate =
    document.getElementById(
        "historyDate"
    );


const historySection =
    document.getElementById(
        "historySection"
    );


const toast =
    document.getElementById(
        "toast"
    );


// =====================================================
// GET TODAY KEY
// =====================================================

function getTodayKey() {

    const date =
        new Date();


    const year =
        date.getFullYear();


    const month =
        String(
            date.getMonth() + 1
        ).padStart(
            2,
            "0"
        );


    const day =
        String(
            date.getDate()
        ).padStart(
            2,
            "0"
        );


    return `${year}-${month}-${day}`;

}


// =====================================================
// FORMAT DATE
// =====================================================

function formatDate(dateKey) {

    const date =
        new Date(
            dateKey +
            "T00:00:00"
        );


    return date.toLocaleDateString(
        "en-IN",
        {
            weekday: "long",
            day: "2-digit",
            month: "long",
            year: "numeric"
        }
    );

}


// =====================================================
// GET HISTORY
// =====================================================

function getHistory() {

    try {

        return JSON.parse(
            localStorage.getItem(
                STORAGE_KEY
            )
        ) || {};

    }

    catch (error) {

        return {};

    }

}


// =====================================================
// SAVE HISTORY
// =====================================================

function saveHistory(history) {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(history)
    );

}


// =====================================================
// CREATE EMPTY ATTENDANCE
// =====================================================

function createEmptyAttendance() {

    const data = {};


    students.forEach(
        student => {

            data[student] = 0;

        }
    );


    return data;

}


// =====================================================
// LOAD TODAY'S ATTENDANCE
// =====================================================

function loadTodayAttendance() {

    const history =
        getHistory();


    const today =
        getTodayKey();


    if (history[today]) {

        return {
            ...history[today]
        };

    }


    return createEmptyAttendance();

}


// =====================================================
// REMOVE HISTORY OLDER THAN 7 DAYS
// =====================================================

function cleanOldHistory() {

    const history =
        getHistory();


    const today =
        new Date(
            getTodayKey() +
            "T00:00:00"
        );


    Object.keys(history).forEach(
        dateKey => {

            const savedDate =
                new Date(
                    dateKey +
                    "T00:00:00"
                );


            const difference =
                today - savedDate;


            const daysOld =
                difference /
                (
                    1000 *
                    60 *
                    60 *
                    24
                );


            if (daysOld >= 7) {

                delete history[
                    dateKey
                ];

            }

        }
    );


    saveHistory(history);

}


// =====================================================
// START ATTENDANCE
// =====================================================

startBtn.addEventListener(
    "click",
    () => {

        welcomePage.classList.add(
            "hidden"
        );


        attendancePage.classList.remove(
            "hidden"
        );


        attendance =
            loadTodayAttendance();


        renderStudents();


        renderTables();


        loadHistoryDates();

    }
);


// =====================================================
// HOME
// =====================================================

backBtn.addEventListener(
    "click",
    () => {

        attendancePage.classList.add(
            "hidden"
        );


        welcomePage.classList.remove(
            "hidden"
        );

    }
);


// =====================================================
// RELOAD
// =====================================================
//
// Reloading the page does NOT delete localStorage.
// Therefore history remains.
//
// =====================================================

reloadBtn.addEventListener(
    "click",
    () => {

        window.location.reload();

    }
);


// =====================================================
// DISPLAY TODAY
// =====================================================

document.getElementById(
    "todayDate"
).textContent =
    formatDate(
        getTodayKey()
    );


// =====================================================
// RENDER STUDENTS
// =====================================================

function renderStudents(
    search = ""
) {

    const list =
        document.getElementById(
            "studentList"
        );


    list.innerHTML = "";


    const filtered =
        students.filter(
            student =>
                student
                    .toLowerCase()
                    .includes(
                        search.toLowerCase()
                    )
        );


    filtered.forEach(
        student => {

            const button =
                document.createElement(
                    "button"
                );


            /*
            Base class
            */

            button.className =
                "student-btn";


            /*
            Student name
            */

            button.textContent =
                student;


            /*
            Current status
            */

            const status =
                attendance[student] || 0;


            /*
            Add color class
            */

            if (status === 1) {

                button.classList.add(
                    "present"
                );

            }

            else if (status === 2) {

                button.classList.add(
                    "absent"
                );

            }

            else if (status === 3) {

                button.classList.add(
                    "duty"
                );

            }


            /*
            Click student
            */

            button.addEventListener(
                "click",
                () => {

                    markStudent(
                        student
                    );

                }
            );


            list.appendChild(
                button
            );

        }
    );


    if (filtered.length === 0) {

        list.innerHTML = `
            <p class="history-empty">
                No student found.
            </p>
        `;

    }

}


// =====================================================
// MARK STUDENT
// =====================================================

function markStudent(student) {

    /*
        Current status
    */

    const currentStatus =
        attendance[student] || 0;


    /*
        Increase click count

        0 → 1 Present
        1 → 2 Absent
        2 → 3 On Duty
        3 → 0 Reset
    */

    attendance[student] =
        currentStatus + 1;


    /*
        Reset after 3rd click
    */

    if (
        attendance[student] > 3
    ) {

        attendance[student] = 0;

    }


    /*
        IMPORTANT:
        Re-render student buttons.

        This changes the color
        immediately.
    */

    renderStudents(
        searchInput.value
    );


    /*
        Update tables
    */

    renderTables();

}


// =====================================================
// GET STUDENTS BY STATUS
// =====================================================

function getStudentsByStatus(
    status
) {

    return students.filter(
        student =>
            attendance[student] === status
    );

}


// =====================================================
// RENDER TABLES
// =====================================================

function renderTables() {

    const present =
        getStudentsByStatus(1);


    const absent =
        getStudentsByStatus(2);


    const duty =
        getStudentsByStatus(3);


    /*
        Fill tables
    */

    fillTable(
        "presentTable",
        present
    );


    fillTable(
        "absentTable",
        absent
    );


    fillTable(
        "dutyTable",
        duty
    );


    /*
        Statistics
    */

    document.getElementById(
        "totalCount"
    ).textContent =
        students.length;


    document.getElementById(
        "presentCount"
    ).textContent =
        present.length;


    document.getElementById(
        "absentCount"
    ).textContent =
        absent.length;


    document.getElementById(
        "dutyCount"
    ).textContent =
        duty.length;


    /*
        Table counts
    */

    document.getElementById(
        "presentTableCount"
    ).textContent =
        present.length;


    document.getElementById(
        "absentTableCount"
    ).textContent =
        absent.length;


    document.getElementById(
        "dutyTableCount"
    ).textContent =
        duty.length;

}


// =====================================================
// FILL TABLE
// =====================================================

function fillTable(
    tableId,
    names
) {

    const table =
        document.getElementById(
            tableId
        );


    table.innerHTML = "";


    names.forEach(
        (name, index) => {

            table.innerHTML += `

                <tr>

                    <td>
                        ${index + 1}
                    </td>

                    <td>
                        ${name}
                    </td>

                </tr>

            `;

        }
    );

}


// =====================================================
// SAVE ATTENDANCE
// =====================================================

saveBtn.addEventListener(
    "click",
    () => {

        /*
        Find unmarked students.
        */

        const unmarked =
            students.filter(
                student =>
                    attendance[student] === 0
            );


        /*
        If there are unmarked students,
        tell representative.
        */

        if (
            unmarked.length > 0
        ) {

            const confirmSave =
                confirm(
                    `${unmarked.length} student(s) are not marked.\n\nThey will automatically be marked as ABSENT.\n\nDo you want to continue?`
                );


            if (!confirmSave) {

                return;

            }

        }


        /*
        Automatically mark
        unselected students as absent.
        */

        students.forEach(
            student => {

                if (
                    attendance[student] === 0
                ) {

                    attendance[student] = 2;

                }

            }
        );


        /*
        Get history
        */

        const history =
            getHistory();


        const today =
            getTodayKey();


        /*
        Save today's attendance
        */

        history[today] = {
            ...attendance
        };


        /*
        Store in localStorage
        */

        saveHistory(history);


        /*
        Update screen
        */

        renderStudents(
            searchInput.value
        );


        renderTables();


        loadHistoryDates();


        historyDate.value =
            today;


        showHistory(
            today
        );


        showToast(
            "✅ Attendance saved successfully!"
        );

    }
);


// =====================================================
// RESET TODAY
// =====================================================

resetBtn.addEventListener(
    "click",
    () => {

        const confirmReset =
            confirm(
                "Are you sure you want to reset today's attendance?"
            );


        if (!confirmReset) {

            return;

        }


        /*
        Reset all students
        */

        attendance =
            createEmptyAttendance();


        /*
        Remove today's history
        */

        const history =
            getHistory();


        const today =
            getTodayKey();


        delete history[
            today
        ];


        saveHistory(
            history
        );


        /*
        Refresh UI
        */

        renderStudents(
            searchInput.value
        );


        renderTables();


        loadHistoryDates();


        historyDate.value =
            "";


        showHistory(
            ""
        );


        showToast(
            "🔄 Today's attendance has been reset."
        );

    }
);


// =====================================================
// SEARCH
// =====================================================

searchInput.addEventListener(
    "input",
    () => {

        renderStudents(
            searchInput.value
        );

    }
);


// =====================================================
// COPY NAMES
// =====================================================

async function copyNames(
    status
) {

    const names =
        getStudentsByStatus(
            status
        );


    if (
        names.length === 0
    ) {

        showToast(
            "No students in this list."
        );

        return;

    }


    /*
    One name per line
    */

    const text =
        names.join(
            "\n"
        );


    try {

        /*
        Clipboard API
        */

        await navigator.clipboard.writeText(
            text
        );


        showToast(
            "📋 Names copied to clipboard!"
        );

    }

    catch (error) {

        /*
        Fallback
        */

        const textarea =
            document.createElement(
                "textarea"
            );


        textarea.value =
            text;


        textarea.style.position =
            "fixed";


        textarea.style.left =
            "-9999px";


        document.body.appendChild(
            textarea
        );


        textarea.focus();


        textarea.select();


        try {

            document.execCommand(
                "copy"
            );


            showToast(
                "📋 Names copied to clipboard!"
            );

        }

        catch (copyError) {

            showToast(
                "❌ Copy failed."
            );

        }


        document.body.removeChild(
            textarea
        );

    }

}


// =====================================================
// COPY PRESENT
// =====================================================

document.getElementById(
    "copyPresentBtn"
).addEventListener(
    "click",
    () => {

        copyNames(1);

    }
);


// =====================================================
// COPY ABSENT
// =====================================================

document.getElementById(
    "copyAbsentBtn"
).addEventListener(
    "click",
    () => {

        copyNames(2);

    }
);


// =====================================================
// COPY ON DUTY
// =====================================================

document.getElementById(
    "copyDutyBtn"
).addEventListener(
    "click",
    () => {

        copyNames(3);

    }
);


// =====================================================
// LOAD HISTORY DATES
// =====================================================

function loadHistoryDates() {

    const history =
        getHistory();


    historyDate.innerHTML = `

        <option value="">
            Select Date
        </option>

    `;


    const dates =
        Object.keys(history)
            .sort()
            .reverse();


    dates.forEach(
        dateKey => {

            const option =
                document.createElement(
                    "option"
                );


            option.value =
                dateKey;


            option.textContent =
                formatDate(
                    dateKey
                );


            historyDate.appendChild(
                option
            );

        }
    );

}


// =====================================================
// SHOW HISTORY
// =====================================================

function showHistory(
    dateKey
) {

    const history =
        getHistory();


    const content =
        document.getElementById(
            "historyContent"
        );


    if (
        !dateKey ||
        !history[dateKey]
    ) {

        content.innerHTML = `

            <p class="history-empty">

                Select a date to view attendance.

            </p>

        `;

        return;

    }


    const data =
        history[dateKey];


    const present = [];

    const absent = [];

    const duty = [];


    students.forEach(
        student => {

            if (
                data[student] === 1
            ) {

                present.push(
                    student
                );

            }

            else if (
                data[student] === 2
            ) {

                absent.push(
                    student
                );

            }

            else if (
                data[student] === 3
            ) {

                duty.push(
                    student
                );

            }

        }
    );


    content.innerHTML = `

        <h3>
            ${formatDate(dateKey)}
        </h3>

        <br>


        <div class="history-summary">


            <div
                class="history-box
                history-present"
            >

                <span>
                    Present
                </span>

                <strong>
                    ${present.length}
                </strong>

            </div>


            <div
                class="history-box
                history-absent"
            >

                <span>
                    Absent
                </span>

                <strong>
                    ${absent.length}
                </strong>

            </div>


            <div
                class="history-box
                history-duty"
            >

                <span>
                    On Duty
                </span>

                <strong>
                    ${duty.length}
                </strong>

            </div>


        </div>


        <table class="history-table">

            <thead>

                <tr>

                    <th>
                        S.No
                    </th>

                    <th>
                        Student Name
                    </th>

                    <th>
                        Status
                    </th>

                </tr>

            </thead>


            <tbody>

                ${createHistoryRows(
                    present,
                    "Present"
                )}

                ${createHistoryRows(
                    absent,
                    "Absent"
                )}

                ${createHistoryRows(
                    duty,
                    "On Duty"
                )}

            </tbody>

        </table>

    `;

}


// =====================================================
// CREATE HISTORY ROWS
// =====================================================

function createHistoryRows(
    names,
    status
) {

    return names.map(
        (name, index) => {

            return `

                <tr>

                    <td>
                        ${index + 1}
                    </td>

                    <td>
                        ${name}
                    </td>

                    <td>
                        ${status}
                    </td>

                </tr>

            `;

        }
    ).join("");

}


// =====================================================
// HISTORY DATE SELECT
// =====================================================

historyDate.addEventListener(
    "change",
    () => {

        showHistory(
            historyDate.value
        );

    }
);


// =====================================================
// HISTORY BUTTON
// =====================================================

historyBtn.addEventListener(
    "click",
    () => {

        historySection.scrollIntoView({
            behavior: "smooth"
        });

    }
);


// =====================================================
// TOAST MESSAGE
// =====================================================

function showToast(
    message
) {

    toast.textContent =
        message;


    toast.classList.add(
        "show"
    );


    setTimeout(
        () => {

            toast.classList.remove(
                "show"
            );

        },
        2500
    );

}


// =====================================================
// INITIALIZATION
// =====================================================

cleanOldHistory();


attendance =
    loadTodayAttendance();


renderStudents();


renderTables();


loadHistoryDates();