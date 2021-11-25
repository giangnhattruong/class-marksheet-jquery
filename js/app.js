/* MAKE A FAKE STUDENT TEST SCORE SERVICE */

/**
 * Represents a student with test scores
 * @constructor
 * @param {string} name - Student name
 * @param {number} mathScore - Student's math score
 * @param {number} physicalScore - Student's physical score
 * @param {number} chemistryScore - Student's chemistry score
 */
class TestScore {
	constructor(name, mathScore, physicalScore, chemistryScore) {
		this.name = name;
		this.mathScore = mathScore;
		this.physicalScore = physicalScore;
		this.chemistryScore = chemistryScore;
	}
}

/**
 * Generate student ID
 * @returns {number}
 */
const studentIdGenerate = (function() {
	let id = 0;
	return function() {
		id++;
		return `stud${id}`;
	};
})();

/**
 * Students data initialize
 * @type {array}
 */
const students = [];

/**
 * Get All Students Data
 * @returns {array}
 */
function getStudents() {
	return students;
}

/**
 * Get a student data by ID
 * @param {string} id - Student ID
 * @returns {object}
 */
function getStudentById(id) {
	return students.find((s) => s.id === id);
}

/**
 * Add new student to data @see {@link formatScore}
 * @returns {object}
 */
function addStudent(name, mathScore, physicalScore, chemistryScore) {
	const fmMathScore = formatScore(mathScore);
	const fmPhysicalScore = formatScore(physicalScore);
	const fmChemistryScore = formatScore(chemistryScore);

	const newStudent = new TestScore(name, fmMathScore, fmPhysicalScore, fmChemistryScore);
	newStudent.id = studentIdGenerate();
	students.push(newStudent);

	return newStudent;
}

/**
 * Update existing student from data @see {@link formatScore}
 * @returns {object}
 */
function updateStudent(id, name, mathScore, physicalScore, chemistryScore) {
	const fmMathScore = formatScore(mathScore);
	const fmPhysicalScore = formatScore(physicalScore);
	const fmChemistryScore = formatScore(chemistryScore);

	const student = getStudentById(id);
	student.name = name;
	student.mathScore = fmMathScore;
	student.physicalScore = fmPhysicalScore;
	student.chemistryScore = fmChemistryScore;

	return student;
}

/**
 * Delete existing student from data
 * @returns {object}
 */
function deleteStudent(id) {
	const studentIndex = students.findIndex((s) => s.id === id);
	const deletedStudent = students[studentIndex];
	students.splice(studentIndex, 1);
	return deletedStudent;
}

/**
 * Format a score from a number or string input to a fixed number
 * @returns {string}
 */
function formatScore(score) {
	const scr = Number(score);
	formattedScore = scr === Math.floor(scr) ? scr.toFixed(0) : scr.toFixed(1);
	return Number(formattedScore);
}

/**
 * Generate seeds
 */
function seeds() {
	addStudent('Hoài An', 7.5713123, 0, 8.5);
	addStudent('Văn Nam', 8, 9, 8.5);
	addStudent('Tường Vi', 9, 9, 8.5);
	addStudent('James River', 9, 9, 9);
	addStudent('Mark Thomas', 7.9, 10, 8.125);
	addStudent('Nhật Trường', 9, 9, 9);
	addStudent('Susan Ngô', 8.6, 9.5, 8.75);
	addStudent('Donald Trung', 5.5, 6.6, 9.9);
	addStudent('Tony Bond', 3, 4.123123, 6.123123123);
	updateTable();
}

/* UPDATE DOM */

/**
 * @type {object}
 */
const config = {
	errors          : {
		nameMsg        : 'Họ tên không được ít hơn 3 ký tự!',
		scoreMsg       : 'Bạn phải nhập một số nằm trong khoảng 0-10!',
		submitErrorMsg : 'Xin vui lòng nhập thông tin đầy đủ và hợp lệ',
		class          : 'text-danger',
		inputClass     : 'border-danger',
		editingClass   : 'border-danger text-danger'
	},
	success         : {
		msg        : 'Thông tin đã hợp lệ.',
		class      : 'text-success',
		inputClass : 'border-success'
	},
	smallTextClass  : 'text-muted',
	notifyNameText  : 'Họ và tên đầy đủ (hơn 3 ký tự)',
	notifyScoreText : 'Điểm số trong khoảng: 0-10',
	showAvgText     : 'Tính điểm trung bình',
	hideAvgText     : 'Ẩn điểm trung bình',
	showExlText     : 'Xác định học sinh giỏi',
	hideExlText     : 'Ẩn học sinh giỏi',
	noBorderClass   : 'border-0',
	exellentClass   : 'excellent'
};

/* Add dynamic texts */
setNotify();

/* Refrest the table to hide it when there aren't no data */
updateTable();

/* Add event listener */
$('#get-scores input').on('keyup blur', function() {
	validateInput($(this));
});
$('#toggle-calculate-btn').click(toggleShowScoreAverage);
$('#toggle-find-exellent-btn').click(toggleFindExellent);

$('#get-scores').submit(function(e) {
	e.preventDefault();
	const name = $(this).find('#name');
	const mathScore = $(this).find('#math-score');
	const physicalScore = $(this).find('#physical-score');
	const chemistryScore = $(this).find('#chemistry-score');
	const isFormValidated = validateForm(name, mathScore, physicalScore, chemistryScore);

	if (isFormValidated) {
		addStudent(name.val(), mathScore.val(), physicalScore.val(), chemistryScore.val());
		updateTable();
		formReset($(this));
	}
	addFormSubmitError($(this).children('#form-submit-error'), isFormValidated);
});

/**
 * Set form notifies under each input to default
 */
function setNotify() {
	$('#get-scores small')
		.removeClass([ config.errors.class, config.success.class ])
		.addClass(config.smallTextClass)
		.text('');
	$('#get-scores small').prev().removeClass(config.success.inputClass);
	$('.notify-name').text(config.notifyNameText);
	$('.notify-score').text(config.notifyScoreText);
}

/**
 * Reset form after each submit @see {@link setNotify}
 * @param {object} form 
 */
function formReset(form) {
	form.trigger('reset');
	setNotify();
}

/**
 * Add error text if form validation fail
 * @param {object} element - DOM element above submit button which contain error message
 * @param {boolean} isValidated - Form validation
 */
function addFormSubmitError(element, isValidated) {
	element.text(config.errors.submitErrorMsg);
	element.toggle(!isValidated);
}

/**
 * Validate form input
 * @param  {...any} inputs - Collection of input object in form @see {@link validateInput}
 * @returns {boolean}
 */
function validateForm(...inputs) {
	return inputs.every((i) => {
		return validateInput(i) === true;
	});
}

/**
 * Validate input and add error/success message right below it @see {@link addErrorMessage}, @see {@link addSuccessMessage}, @see {@link validateScores}
 * @param {object} input - Input object for validation
 * @returns {boolean}
 */
function validateInput(input) {
	const value = input.val();
	const notify = input.next();
	if (input.hasClass('student-name') && value.length < 3) {
		addErrorMessage(notify, config.errors.nameMsg);
		return false;
	} else if (input.hasClass('student-score')) {
		if (!validateScores(value)) {
			addErrorMessage(notify, config.errors.scoreMsg);
			return false;
		}
	}
	addSuccessMessage(notify, config.success.msg);
	return true;
}

/**
 * Validate all numbers that passed in to be valid scores
 * @param  {...any} values - spread array for numbers to be validated
 * @returns {boolean}
 */
function validateScores(...values) {
	return values.every((value) => {
		return Number(value) >= 0 && Number(value) <= 10 && value !== '';
	});
}

/**
 * Add text and styles to success notify element
 * @param {object} element - DOM element below each input which contain notify message
 * @param {*} message - Notify text
 */
function addSuccessMessage(element, message) {
	const input = element.prev();
	input.removeClass(config.errors.inputClass);
	input.addClass(config.success.inputClass);

	element.removeClass([ config.smallTextClass, config.errors.class ]);
	element.addClass(config.success.class);
	element.text(message);
}

/**
 * Add text and styles to error notify element
 * @param {object} element - DOM element below each input which contain notify message
 * @param {*} message - Notify text
 */
function addErrorMessage(element, message) {
	const input = element.prev();
	input.removeClass(config.success.inputClass);
	input.addClass(config.errors.inputClass);

	element.removeClass([ config.smallTextClass, config.errors.class ]);
	element.addClass(config.errors.class);
	element.text(message);
}

/**
 * Function that will be invoked on Calculate Average Button click (toggle) @see {@link toggleBtnText}, @see {@link toggleCalculateAverage}
 */
function toggleShowScoreAverage() {
	toggleBtnText($(this), config.showAvgText, config.hideAvgText);
	$('#table-rows .student-row').each(toggleCalculateAverage);
}

/**
 * Get all scores of one student, calculate for average, then insert that result into cell (toggle) @see {@link formatScore}
 * @param {number} index
 * @param {object} row - Row object from table which contain infomations from one student
 */
function toggleCalculateAverage(index, row) {
	const scores = [];
	const inputs = $(row).find('input');
	const averageCell = $(row).find('.score-average');

	inputs.each(function(index, input) {
		scores.push(Number($(input).val()));
	});

	const average =
		scores.reduce((acc, next) => {
			return acc + next;
		}) / scores.length;
	averageCell.text(averageCell.text() === '?' ? formatScore(average) : '?');
}

/**
 * Function that will be invoked on Find Exellent Student Button click (toggle) @see {@link toggleBtnText}
 */
function toggleFindExellent() {
	if ($('#table-rows .student-row:first .score-average').text() !== '?') {
		toggleBtnText($(this), config.showExlText, config.hideExlText);
		$('#table-rows .student-row').each(markRow);
	}
}

/**
 * Get score average from cell, if average >= 8 means this is an exellent student, then add CSS class to mark this row (toggle)
 * @param {number} index 
 * @param {object} row - Row object from table which contain infomations from one student
 */
function markRow(index, row) {
	const average = Number($(row).find('.score-average').text());
	const exellentClass = average >= 8 ? config.exellentClass : '';
	$(row).toggleClass(exellentClass);
}

/**
 * Replace text in button (toggle)
 * @param {object} button - A button object which's text can be toggle between 2 values
 * @param {string} showText - A text string which represents showing infomations
 * @param {string} hideText - A text string which represents hiding infomations
 */
function toggleBtnText(button, showText, hideText) {
	const currentText = button.text();
	button.text(currentText === showText ? hideText : showText);
}

/**
 * Get all data from students array, then append rows with informations to table body
 * This is used to refresh the table after add new data or delete existing data
 * Hide all table if there is no data @see {@link getStudents}, @see {@link addTableRow}
 */
function updateTable() {
	$('#table-rows').empty();
	$('#form-submit-error').text(config.submitErrorMsg);
	$('#toggle-calculate-btn').text(config.showAvgText);
	$('#toggle-find-exellent-btn').text(config.showExlText);
	const students = getStudents();
	$.each(students, addTableRows);

	const areRows = $('#table-rows').children().length > 0;
	$('#table-content').toggle(areRows);
}

/**
 * Append a row which contain information from one student, add event to edit, save, delete buttons @see {@link addEventToRow}
 * @param {number} index 
 * @param {object} student - A object which contain informations form one student (name, scores)
 */
function addTableRows(index, student) {
	$('#table-rows').append(`<tr
								class="student-row"
								data-id="${student.id}"
							>
								<th scope="row">${index + 1}</th>
								<td class="student-name">${student.name}</td>
								<td>
								<input
									type="number"
									class="math-score bg-white text-end ${config.noBorderClass}"
									value="${student.mathScore}"
									readonly
									style="width:3rem; color:inherit"
								>
								</td>
								<td>
								<input
									type="number"
									class="physical-score bg-white text-end ${config.noBorderClass}"
									value="${student.physicalScore}"
									readonly
									style="width:3rem; color:inherit"
								>
								</td>
								<td>
								<input
									type="number"
									class="chemistry-score bg-white text-end ${config.noBorderClass}"
									value="${student.chemistryScore}"
									readonly
									style="width:3rem; color:inherit"
								>
								</td>
								<td class="score-average">?</td>
								<td>
								<i
									class="row-btn open-editing-form-btn bi bi-pencil-square me-3"
								></i>
								<i
									class="row-btn save-editing-form-btn bi bi-check2-square me-3"
									style='display:none;'
								></i>
								<i
									class="row-btn delete-row-btn bi bi-trash"
								></i>
							</tr>`);

	addEventToRow($('#table-rows .student-row:last'));
}

/**
 * Add event listener to row buttons (to open edit form, save changes or delete row)
 * @param {object} row - A table row which contain informations from one student
 */
function addEventToRow(row) {
	const id = row.attr('data-id');
	row.click(function(e) {
		if ($(e.target).hasClass('open-editing-form-btn')) {
			openEditingForm(row);
		} else if ($(e.target).hasClass('save-editing-form-btn')) {
			saveEditingForm(row, id);
		} else if ($(e.target).hasClass('delete-row-btn')) {
			deleteRow(row, id);
		}
	});
}

/**
 * Open editing form
 * First close all editing forms from all rows, 
 * then highlight this row's input borders, disable readOnly, 
 * and switch open edit form button to save button. @see {@link closeEditingForm}, @see {@link replaceButton}
 * @param {object} row - A table row which contain informations from one student
 */
function openEditingForm(row) {
	const allRows = $('#table-rows .student-row');
	$.each(allRows, function(index, row) {
		closeEditingForm($(row));
	});

	const inputs = row.find('input');
	const openBtn = row.find('.open-editing-form-btn');
	const saveBtn = row.find('.save-editing-form-btn');
	inputs.removeClass(config.noBorderClass).prop('readOnly', false);
	replaceButton(openBtn, saveBtn);
}

/**
 * Close editing form
 * Hide this row's input borders, enable readOnly, 
 * and switch save button to open edit form button.
 * @param {object} row - A table row which contain informations from one student @see {@link replaceButton}
 */
function closeEditingForm(row) {
	const inputs = row.find('input');
	const openBtn = row.find('.open-editing-form-btn');
	const saveBtn = row.find('.save-editing-form-btn');
	inputs.addClass(config.noBorderClass).prop('readOnly', true);
	inputs.removeClass(config.errors.editingClass);
	replaceButton(saveBtn, openBtn);
}

/**
 * Switch button display
 * @param {object} hideButton - A button object which will be hide
 * @param {object} showButton - A button object which will be show
 */
function replaceButton(hideButton, showButton) {
	hideButton.hide();
	showButton.show();
}

/**
 * Get and validate edited data, update data, then refresh the table @see {@link validateScores}, @see {@link closeEditingForm}, @see {@link updateStudent}
 * @param {object} row - A table row which contain informations from one student
 * @param {string} id - Student ID for update and delete data
 */
function saveEditingForm(row, id) {
	const name = row.find('.student-name').text();
	const inputs = row.find('input');
	const mathScore = row.find('.math-score').val();
	const physicalScore = row.find('.physical-score').val();
	const chemistryScore = row.find('.chemistry-score').val();
	const scores = [ mathScore, physicalScore, chemistryScore ];

	if (validateScores(...scores)) {
		closeEditingForm(row);
		updateStudent(id, name, mathScore, physicalScore, chemistryScore);
	} else {
		inputs.addClass(config.errors.editingClass);
	}
}

/**
 * Delete a row, delete date then refresh the table @see {@link deleteStudent}, @see {@link updateTable}
 * @param {object} row - A table row which contain informations from one student
 * @param {*} id - Student ID for update and delete data
 */
function deleteRow(row, id) {
	row.remove();
	deleteStudent(id);
	updateTable();
}
