var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/psy', function(req, res, next) {
  res.json({
    oppa: 'gangnamJSON'
  });
});

/* GET enents listing. */
router.get('/commentsArray', function(req, res, next) {
  var comments = {
        event: {
            event01: {
                title: 'Понимание типов сервисов в AngularJS',
                description: 'Переменная подобна константе, но может быть изменена. Она часто используется для настройки директив. Переменная подобна усеченной версии фабрики, только содержит значения, которые не могут быть вычислены в самом сервисе.',
                img: 'http://www.indiaonrent.com/forwards/n/nature-beauty-amazing/res/5mavuy.jpg' 
            }
        },
        comments: {
            item01: {
                comment: 'WTF?',
                nameUser: 'stepan'
            },
            item02: {
                comment: 'boroda!!!',
                nameUser: 'ivan'
            }, 
            item03: {
                comment: 'Странно тогда почему нельзя обращаться и так: price',
                nameUser: 'Ignat'
            } 
        }
  };
  res.json(comments);
});

module.exports = router;
