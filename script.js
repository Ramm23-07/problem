// =====================================================
// ATTENDANCE MANAGEMENT
// III CSBS
// DONE BY RAMMBALAJI G
// =====================================================


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
//
// 0 = NOT MARKED
// 1 = PRESENT
// 2 = ABSENT
// 3 = OD
// =====================================================

let attendance = {};


// =====================================================
// GET DOM ELEMENTS
// =====================================================

const welcomePage =
    document.getElementById("welcomePage");

const attendancePage =
    document.getElementById("attendancePage");

const startBtn =
    document.getElementById("startBtn");

const backBtn =
    document.getElementById("backBtn");

const reloadBtn =
    document.getElementById("reloadBtn");

const historyBtn =
    document.getElementById("historyBtn");

const saveBtn =
    document.getElementById("saveBtn");

const resetBtn =
    document.getElementById("resetBtn");

const searchInput =
    document.getElementById("searchInput");

const historyDate =
    document.getElementById("historyDate");

const historySection =
    document.getElementById("historySection");

const toast =
    document.getElementById("toast");


// =====================================================
// GET TODAY KEY
// FORMAT: YYYY-MM-DD
// =====================================================

function getTodayKey() {

    const date = new Date();

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
//
// Example:
// Wednesday, 26 August 2026
// =====================================================

function formatDate(dateKey) {

    const date =
        new Date(
            dateKey + "T00:00:00"
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
// DATE FOR COPY
//
// Example:
// 26/08/2026
// =====================================================

function getCopyDate(dateKey = null) {

    let date;

    if (dateKey) {

        date =
            new Date(
                dateKey + "T00:00:00"
            );

    } else {

        date = new Date();

    }

    const day =
        String(
            date.getDate()
        ).padStart(2, "0");

    const month =
        String(
            date.getMonth() + 1
        ).padStart(2, "0");

    const year =
        date.getFullYear();

    return `${day}/${month}/${year}`;
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
// GET HISTORY
// =====================================================

function getHistory() {

    try {

        const saved =
            localStorage.getItem(
                STORAGE_KEY
            );

        if (!saved) {

            return {};

        }

        return JSON.parse(saved);

    } catch (error) {

        console.error(
            "Error loading history:",
            error
        );

        return {};

    }
}


// =====================================================
// SAVE HISTORY
// =====================================================

function saveHistory(history) {

    try {

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(history)
        );

    } catch (error) {

        console.error(
            "Error saving history:",
            error
        );

        showToast(
            "❌ Unable to save history!"
        );

    }
}


// =====================================================
// LOAD TODAY ATTENDANCE
// =====================================================

function loadTodayAttendance() {

    const history =
        getHistory();

    const today =
        getTodayKey();

    if (history[today]) {

        return {
            ...createEmptyAttendance(),
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
// START BUTTON
// =====================================================

if (startBtn) {

    startBtn.addEventListener(
        "click",
        () => {

            if (welcomePage) {

                welcomePage.classList.add(
                    "hidden"
                );

            }

            if (attendancePage) {

                attendancePage.classList.remove(
                    "hidden"
                );

            }

            attendance =
                loadTodayAttendance();

            renderStudents();

            renderTables();

            loadHistoryDates();

        }
    );

}


// =====================================================
// BACK BUTTON
// =====================================================

if (backBtn) {

    backBtn.addEventListener(
        "click",
        () => {

            if (attendancePage) {

                attendancePage.classList.add(
                    "hidden"
                );

            }

            if (welcomePage) {

                welcomePage.classList.remove(
                    "hidden"
                );

            }

        }
    );

}


// =====================================================
// RELOAD BUTTON
//
// DOES NOT DELETE HISTORY
// =====================================================

if (reloadBtn) {

    reloadBtn.addEventListener(
        "click",
        () => {

            window.location.reload();

        }
    );

}


// =====================================================
// TODAY DATE
// =====================================================

const todayDateElement =
    document.getElementById(
        "todayDate"
    );

if (todayDateElement) {

    todayDateElement.textContent =
        formatDate(
            getTodayKey()
        );

}


// =====================================================
// RENDER STUDENTS
// =====================================================

function renderStudents(search = "") {

    const list =
        document.getElementById(
            "studentList"
        );

    if (!list) {

        return;

    }

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


            const status =
                attendance[student] || 0;


            // -----------------------------------------
            // PRESENT
            // -----------------------------------------

            if (status === 1) {

                button.classList.add(
                    "present"
                );

            }


            // -----------------------------------------
            // ABSENT
            // -----------------------------------------

            else if (status === 2) {

                button.classList.add(
                    "absent"
                );

            }


            // -----------------------------------------
            // OD
            // -----------------------------------------

            else if (status === 3) {

                button.classList.add(
                    "duty"
                );

            }


            // -----------------------------------------
            // CLICK
            // -----------------------------------------

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
//
// CLICK 1 = PRESENT
// CLICK 2 = ABSENT
// CLICK 3 = OD
// CLICK 4 = RESET
// =====================================================

function markStudent(student) {

    const currentStatus =
        attendance[student] || 0;


    attendance[student] =
        currentStatus + 1;


    if (
        attendance[student] > 3
    ) {

        attendance[student] = 0;

    }


    renderStudents(
        searchInput
            ? searchInput.value
            : ""
    );


    renderTables();

}


// =====================================================
// GET STUDENTS BY STATUS
// =====================================================

function getStudentsByStatus(status) {

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


    // -----------------------------------------
    // MAIN COUNTS
    // -----------------------------------------

    setText(
        "totalCount",
        students.length
    );

    setText(
        "presentCount",
        present.length
    );

    setText(
        "absentCount",
        absent.length
    );

    setText(
        "dutyCount",
        duty.length
    );


    // -----------------------------------------
    // TABLE COUNTS
    // -----------------------------------------

    setText(
        "presentTableCount",
        present.length
    );

    setText(
        "absentTableCount",
        absent.length
    );

    setText(
        "dutyTableCount",
        duty.length
    );

}


// =====================================================
// SAFE TEXT SETTER
// =====================================================

function setText(
    id,
    value
) {

    const element =
        document.getElementById(id);

    if (element) {

        element.textContent =
            value;

    }

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


    if (!table) {

        return;

    }


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
//
// UNMARKED STUDENTS
// AUTOMATICALLY BECOME ABSENT
// =====================================================

if (saveBtn) {

    saveBtn.addEventListener(
        "click",
        () => {

            const unmarked =
                students.filter(
                    student =>
                        attendance[student] === 0
                );


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


            // -----------------------------------------
            // AUTO ABSENT
            // -----------------------------------------

            students.forEach(
                student => {

                    if (
                        attendance[student] === 0
                    ) {

                        attendance[student] = 2;

                    }

                }
            );


            // -----------------------------------------
            // SAVE TO HISTORY
            // -----------------------------------------

            const history =
                getHistory();

            const today =
                getTodayKey();


            history[today] = {
                ...attendance
            };


            saveHistory(history);


            // -----------------------------------------
            // REFRESH
            // -----------------------------------------

            renderStudents(
                searchInput
                    ? searchInput.value
                    : ""
            );

            renderTables();

            loadHistoryDates();


            if (historyDate) {

                historyDate.value =
                    today;

            }


            showHistory(today);


            showToast(
                "✅ Attendance saved successfully!"
            );

        }
    );

}


// =====================================================
// RESET BUTTON
// =====================================================

if (resetBtn) {

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


            // -----------------------------------------
            // RESET CURRENT ATTENDANCE
            // -----------------------------------------

            attendance =
                createEmptyAttendance();


            // -----------------------------------------
            // DELETE TODAY HISTORY
            // -----------------------------------------

            const history =
                getHistory();

            const today =
                getTodayKey();


            delete history[today];


            saveHistory(history);


            // -----------------------------------------
            // REFRESH
            // -----------------------------------------

            renderStudents(
                searchInput
                    ? searchInput.value
                    : ""
            );

            renderTables();

            loadHistoryDates();


            if (historyDate) {

                historyDate.value = "";

            }


            showHistory("");


            showToast(
                "🔄 Today's attendance has been reset."
            );

        }
    );

}


// =====================================================
// SEARCH
// =====================================================

if (searchInput) {

    searchInput.addEventListener(
        "input",
        () => {

            renderStudents(
                searchInput.value
            );

        }
    );

}


// =====================================================
// COPY PRESENT / ABSENT / OD
// =====================================================

async function copyNames(status) {

    const present =
        getStudentsByStatus(1);

    const absent =
        getStudentsByStatus(2);

    const duty =
        getStudentsByStatus(3);


    const date =
        getCopyDate();


    let text = "";


    // -----------------------------------------
    // PRESENT
    // -----------------------------------------

    if (status === 1) {

        text =
`${date}
Present - ${present.length}`;


        if (
            present.length > 0
        ) {

            text +=
                "\n" +
                present.join("\n");

        }

    }


    // -----------------------------------------
    // ABSENT
    // -----------------------------------------

    else if (status === 2) {

        text =
`${date}
Absent - ${absent.length}`;


        if (
            absent.length > 0
        ) {

            text +=
                "\n" +
                absent.join("\n");

        }

    }


    // -----------------------------------------
    // OD
    // -----------------------------------------

    else if (status === 3) {

        text =
`${date}
OD - ${duty.length}`;


        if (
            duty.length > 0
        ) {

            text +=
                "\n" +
                duty.join("\n");

        }

    }


    await copyToClipboard(
        text,
        "📋 Copied to clipboard!"
    );

}


// =====================================================
// COPY ALL ATTENDANCE
//
// FINAL FORMAT:
//
// 26/08/2026
// III CSBS
//
// Absent - 5
// Student 1
// Student 2
//
// OD - 2
// Student 3
// Student 4
//
// PRESENT IS NOT INCLUDED.
//
// IF THERE IS NO OD,
// OD SECTION IS NOT INCLUDED.
// =====================================================

async function copyAllAttendance() {

    const absent =
        getStudentsByStatus(2);


    const duty =
        getStudentsByStatus(3);


    const date =
        getCopyDate();


    // -----------------------------------------
    // DATE FIRST
    // III CSBS NEXT LINE
    // -----------------------------------------

    let text =
`${date}
III CSBS

Absent - ${absent.length}`;


    // -----------------------------------------
    // ABSENT NAMES
    // -----------------------------------------

    if (
        absent.length > 0
    ) {

        text +=
            "\n" +
            absent.join("\n");

    }


    // -----------------------------------------
    // OD
    //
    // ADD ONLY IF OD EXISTS
    // -----------------------------------------

    if (
        duty.length > 0
    ) {

        text +=
`

OD - ${duty.length}
${duty.join("\n")}`;

    }


    // -----------------------------------------
    // COPY
    // -----------------------------------------

    await copyToClipboard(
        text,
        "📋 Attendance copied!"
    );

}


// =====================================================
// CLIPBOARD FUNCTION
//
// WORKS ON DESKTOP + MOBILE
// =====================================================

async function copyToClipboard(
    text,
    successMessage
) {

    try {

        if (
            navigator.clipboard &&
            window.isSecureContext
        ) {

            await navigator.clipboard.writeText(
                text
            );

        }

        else {

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

            textarea.style.top =
                "0";


            document.body.appendChild(
                textarea
            );


            textarea.focus();

            textarea.select();


            document.execCommand(
                "copy"
            );


            document.body.removeChild(
                textarea
            );

        }


        showToast(
            successMessage
        );


    } catch (error) {

        console.error(
            "Clipboard error:",
            error
        );


        showToast(
            "❌ Unable to copy!"
        );

    }

}


// =====================================================
// COPY PRESENT BUTTON
// =====================================================

const copyPresentBtn =
    document.getElementById(
        "copyPresentBtn"
    );

if (copyPresentBtn) {

    copyPresentBtn.addEventListener(
        "click",
        () => {

            copyNames(1);

        }
    );

}


// =====================================================
// COPY ABSENT BUTTON
// =====================================================

const copyAbsentBtn =
    document.getElementById(
        "copyAbsentBtn"
    );

if (copyAbsentBtn) {

    copyAbsentBtn.addEventListener(
        "click",
        () => {

            copyNames(2);

        }
    );

}


// =====================================================
// COPY OD BUTTON
// =====================================================

const copyDutyBtn =
    document.getElementById(
        "copyDutyBtn"
    );

if (copyDutyBtn) {

    copyDutyBtn.addEventListener(
        "click",
        () => {

            copyNames(3);

        }
    );

}


// =====================================================
// COPY ALL BUTTON
// =====================================================

const copyAllBtn =
    document.getElementById(
        "copyAllBtn"
    );

if (copyAllBtn) {

    copyAllBtn.addEventListener(
        "click",
        () => {

            copyAllAttendance();

        }
    );

}


// =====================================================
// LOAD HISTORY DATES
// =====================================================

function loadHistoryDates() {

    if (!historyDate) {

        return;

    }


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

function showHistory(dateKey) {

    const history =
        getHistory();


    const content =
        document.getElementById(
            "historyContent"
        );


    if (!content) {

        return;

    }


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

            <div class="history-box history-present">

                <span>
                    Present
                </span>

                <strong>
                    ${present.length}
                </strong>

            </div>


            <div class="history-box history-absent">

                <span>
                    Absent
                </span>

                <strong>
                    ${absent.length}
                </strong>

            </div>


            <div class="history-box history-duty">

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
// HISTORY DATE CHANGE
// =====================================================

if (historyDate) {

    historyDate.addEventListener(
        "change",
        () => {

            showHistory(
                historyDate.value
            );

        }
    );

}


// =====================================================
// HISTORY BUTTON
// =====================================================

if (historyBtn) {

    historyBtn.addEventListener(
        "click",
        () => {

            if (historySection) {

                historySection.scrollIntoView({
                    behavior: "smooth"
                });

            }

        }
    );

}


// =====================================================
// TOAST
// =====================================================

function showToast(message) {

    if (!toast) {

        return;

    }


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