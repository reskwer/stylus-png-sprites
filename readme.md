# Stylus - масштабируемые спрайты


Это демо сборка для просмотра как работает процесс масштабирования спрайтов, в сборке используется `rem` единицы.

  - Масштабирование спрайтов до любой величины
  - Одно изображение для всех ретина и обычных дисплеев.
  - Минимально простой синтаксис в использовании

##### INSTALL
`npm install` или `yarn`, после установки зависимостей запустите сборку командой `gulp` или `npm run gulp` 

#### Использование спрайтов
Синтаксис прост, вызываем миксин спрайта в 2мя параметрами `sprite(name, scale)`
 - `name` - Имя спрайта
 - `scale` - Процент масштабирования, не обязателен, по умолчанию равен `100%`

1 Пример: обычный спрайт, изображение 50х50 в спрайте
```
<i class="icon1"></i>
<i class="icon1"></i>
<i class="icon1"></i>
```
```
.icon1
	sprite(img-50x50)
```

Результат. 
![mountains](https://gitlab.com/reskwer/stylus-png-sprites/raw/master/dist/dlya-gitlab-readme/Screenshot_1.png "Пейзаж с горами")

2 Пример: Изображение 200х200 в спрайте уменьшены до 25%
```
<i class="icon2"></i>
<i class="icon2"></i>
<i class="icon2"></i>
```
```
.icon1
	sprite(img-200x200, 25%)
```

Результат. 
![mountains](https://gitlab.com/reskwer/stylus-png-sprites/raw/master/dist/dlya-gitlab-readme/Screenshot_1.png "Пейзаж с горами")
Как видите результат не виден для вас сейчас, но если посмотреть с ретина `x4` дисплея то разница будет видна примерно вот так

![mountains](https://gitlab.com/reskwer/stylus-png-sprites/raw/master/dist/dlya-gitlab-readme/1.png "Пейзаж с горами")

Так же вы можете спокойно масштабировать спрайт при `:hover`, еффек будет такой же как и простое увеличение изображения.
```
.icon5
	transition all .4s
	sprite(img-50x50)
	
	&:hover
		sprite(img-50x50, 400%)
```


## Немного о том как все работает
Генерация спрайтов осуществляется плагинами
* [gulp](https://www.npmjs.com/package/gulp) - Gulp 3 или 4 версии
* [gulp.spritesmith](https://www.npmjs.com/package/gulp.spritesmith) - плагин генерации спрайтов
* [gulp-stylus](https://www.npmjs.com/package/gulp-stylus) - Сборка стилей

#### Пути и расположения
Все конфиги что отвечают за генерацию спрайта лежат в `./core/`
1.  `template.mustache` - Шаблон генерации массива с метаданными (координат и величин) в stylus виде.
2. `sprite-coords.styl` - Сгенерированные массивы данных координат и величин.
3.  `png-sprite.styl` - Миксин спрайта