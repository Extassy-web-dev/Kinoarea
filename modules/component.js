let header = document.querySelector("header")
let footer = document.querySelector("footer")

header.innerHTML = `

				<div class="left">
					<a href="/"><img src="/public/Логотип.svg" alt=""></a>
					

						<img src="/public/media.png" alt="">
					
				</div>
				<div class="center">
					<p>Афиша</p>
					<p>Медиа</p>
					<p>Фильмы</p>
					<p>Актеры</p>
					<p>Новости</p>
					<p>Подборки</p>
					<p>Категории</p>
				</div>
				<div class="right">
					<button class="search"><img src="/public/Vector.svg" alt=""></button>
					<button class="signin">Войти</button>
				</div>

`

footer.innerHTML = `
<img src="/public/social_media.svg" alt="">
			<nav>
				<a href="#">Афиша</a>
				<a href="#">Новости</a>
				<a href="#">Персоны</a>
				<a href="#">Рейтинги</a>
				<a href="#">Рецензии</a>
				<a href="#">Каталог фильмов</a>
			</nav>
			<p>2020 © Kinoarea.  Все права защищены</p>
			<a class="confidance" href="#">Политика конфиденциальности</a>
`