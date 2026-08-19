// =====================================================
// STUDENTS
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
// STORAGE
// =====================================================

const STORAGE_KEY =
    "rammbalaji_attendance_history";


// =====================================================
// STATUS
// =====================================================

// 0 = Unselected
// 1 = Present
// 2 = Absent
// 3 = On Duty

let attendance = {};


// =====================================================
// DOM
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
// DATE KEY
// =====================================================

function getTodayKey() {

    const date =
        new Date();

    const year =
        date.getFullYear();

    const month =
        String(
            date.getMonth() + 1
        ).padStart(2, "0");

    const day =
        String(
            date.getDate()
        ).padStart(2, "0");

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
// EMPTY ATTENDANCE
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
// LOAD TODAY
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
// DELETE HISTORY OLDER THAN 7 DAYS
// =====================================================

function cleanOldHistory() {

    const history =
        getHistory();

    const today =
        new Date(
            getTodayKey() +
            "T00:00:00"
        );


    Object.keys(history)
        .forEach(
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
// START BUTTON
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
// HOME BUTTON
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
// RELOAD BUTTON
// =====================================================

reloadBtn.addEventListener(
    "click",
    () => {

        /*
        IMPORTANT:

        window.location.reload()
        ONLY reloads the page.

        It does NOT delete localStorage.

        Therefore history remains safe.
        */

        window.location.reload();

    }
);


// =====================================================
// TODAY DATE
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


            button.className =
                "student-btn";


            button.textContent =
                student;


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

        list.innerHTML =
            "<p>No student found.</p>";

    }

}


// =====================================================
// MARK STUDENT
// =====================================================

function markStudent(student) {

    attendance[student]++;


    /*
    1st tap = Present
    2nd tap = Absent
    3rd tap = On Duty
    4th tap = Reset
    */

    if (
        attendance[student] > 3
    ) {

        attendance[student] = 0;

    }


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
        Any student who is still
        unselected becomes ABSENT.
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


        const history =
            getHistory();


        const today =
            getTodayKey();


        /*
        Save today's final data.
        */

        history[today] = {
            ...attendance
        };


        saveHistory(history);


        /*
        Refresh everything.
        */

        renderTables();

        loadHistoryDates();


        /*
        Automatically select today's
        date in history.
        */

        historyDate.value =
            today;


        showHistory(today);


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
        Reset current attendance.
        */

        attendance =
            createEmptyAttendance();


        /*
        Remove today's saved history.
        */

        const history =
            getHistory();


        const today =
            getTodayKey();


        delete history[today];


        saveHistory(history);


        /*
        Refresh page data.
        */

        renderTables();

        loadHistoryDates();


        historyDate.value = "";


        showHistory("");


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

async function copyNames(status) {

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
    One student per line.
    */

    const text =
        names.join("\n");


    try {

        /*
        Modern Clipboard API.
        */

        await navigator.clipboard.writeText(
            text
        );


        showToast(
            "📋 Copied to clipboard!"
        );

    }

    catch (error) {

        /*
        Fallback for browsers
        where Clipboard API
        is unavailable.
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
                "📋 Copied to clipboard!"
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
// COPY BUTTONS
// =====================================================

document.getElementById(
    "copyPresentBtn"
).addEventListener(
    "click",
    () => {

        copyNames(1);

    }
);


document.getElementById(
    "copyAbsentBtn"
).addEventListener(
    "click",
    () => {

        copyNames(2);

    }
);


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

                present.push(student);

            }

            else if (
                data[student] === 2
            ) {

                absent.push(student);

            }

            else if (
                data[student] === 3
            ) {

                duty.push(student);

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
                class="history-box history-present"
            >

                <span>
                    Present
                </span>

                <strong>
                    ${present.length}
                </strong>

            </div>


            <div
                class="history-box history-absent"
            >

                <span>
                    Absent
                </span>

                <strong>
                    ${absent.length}
                </strong>

            </div>


            <div
                class="history-box history-duty"
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
// HISTORY ROWS
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
// TOAST
// =====================================================

function showToast(message) {

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
