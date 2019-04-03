module.exports = function (nav = function() {}, data) {
  $('.defect-manage .nav li a').click(function (e) {
    e.preventDefault();
    $('.defect-manage .nav li').removeClass('active');
    $(this).parent().addClass('active');
    var idx = data.myState[$(this).text()];
    $('.condition-defect .condition-btn').removeClass('active');
    $(`.condition-defect .condition-btn span[value=${idx}]`).parent().addClass('active');
    nav();
  })
  $('.defect-manage .condition-all').click(function () {
    $(this).addClass('active');
    $('.condition-defect .condition-my').removeClass('active');
    var value = $(this).find('span').attr('value');
    data.myState[$('.defect-manage .nav li.active a').text()] = value;
    nav();
  })
  $('.defect-manage .condition-my').click(function () {
    $(this).addClass('active');
    $('.condition-defect .condition-all').removeClass('active');
    var value = $(this).find('span').attr('value');
    data.myState[$('.defect-manage .nav li.active a').text()] = value;
    nav();
  })
}