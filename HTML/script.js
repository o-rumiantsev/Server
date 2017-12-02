function input() {
  const msg = document.getElementById('input').value;
  const inner = document.getElementById('msgs').innerHTML;
  document.getElementById('input').value = '';
  document.getElementById('msgs').innerHTML = `${msg} <br />` + inner;
}
