import express from 'express';

const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.status(200).json({
    info: {
      squad: 'SQ008',
      stack: 'Node',
      noOfDevs: 24,
      noOfSAs: 5,
    },
  });
});

export default router;
