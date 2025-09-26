const dayjs = require('dayjs')
const referrals = require('../models/referrals')

function list(req, res) {
  const { status = '', q = '', sort = 'createdAt_desc' } = req.query

  let rows = referrals.slice()

  if (status) rows = rows.filter(r => r.status === status)

  const needle = q.trim().toLowerCase()
  if (needle) {
    rows = rows.filter(r =>
      (r.clientName || '').toLowerCase().includes(needle) ||
      (r.caregiverName || '').toLowerCase().includes(needle) ||
      (r.id || '').toLowerCase().includes(needle)
    )
  }

  const [field, dir] = sort.split('_') // e.g., createdAt_desc
  rows.sort((a, b) => {
    let A = a[field], B = b[field]
    if (field === 'createdAt') { A = dayjs(A); B = dayjs(B) }
    if (A < B) return dir === 'asc' ? -1 : 1
    if (A > B) return dir === 'asc' ? 1 : -1
    return 0
  })

  const stats = {
    total: referrals.length,
    open: referrals.filter(r => r.status === 'open').length,
    pending: referrals.filter(r => r.status === 'pending').length,
    closed: referrals.filter(r => r.status === 'closed').length
  }

  res.render('referrals/index', { rows, status, q, sort, stats })
}

module.exports = { list }
