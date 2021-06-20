var player;
var coins;
var bombs;
var cursors;
var cursors2;
var pieces = 0;
var gameOver = false;
var victoire = false;
var fireballs;
var fireball;
var bounceCount = 0;
var direction = false;
var fireballActive = false;
var pv = 3;
var heat = 1;
var invincibility = false;
var invincibilityEau = false;
var timedEvent1;
var timedEvent2;
var timedEvent3;
var timedEvent4;
var timedEvent5;
var timedEvent6;
var doubleJump = true;
var airborn = false;
var animBlock = false;
var cdCameleon = 300;  // 600
var cdSerpent = 185;   // 455
var cdHarpie = 200;    // 400
var bombActive = false;
var luminosite = 3;
// var pause = false;




class Level1 extends Phaser.Scene{
    constructor(){
        super("Level1");
    }
    
    init(data){
        pieces = 0;
        gameOver = false;
        victoire = false;
        bounceCount = 0;
        pv = 3;
        heat = 1;
        invincibility = false;
        invincibilityEau = false;
        bombActive = false;
        fireballActive = false;
        animBlock = false;
        direction = false;
        airborn = true;
        doubleJump = true;
        // pause = false;
        cdCameleon = 300; // 600
        cdSerpent = 185;   // 455
        cdHarpie = 200;  // 400
    }

 
    preload ()
    {

        this.load.image('tiles', 'assets/assets_decors.png');
        this.load.tilemapTiledJSON('map', 'assets/tileLevel1.json');


        this.load.spritesheet('coin', 'assets/Spritesheet_Piece.png', { frameWidth: 32 , frameHeight: 32 });
        this.load.image('bomb', 'assets/bomb.png');
        this.load.image('fireball', 'assets/fireball.png');
        this.load.spritesheet('dude', 'assets/spritesheet_norim.png', { frameWidth: 53 , frameHeight: 74 });

        this.load.spritesheet("heatBar", 'assets/Spritesheet_Heatbar.png', { frameWidth:188, frameHeight: 40,});
        this.load.spritesheet("compteur", 'assets/Spritesheet_Compteur_Pieces.png', { frameWidth:100, frameHeight: 40,});
        this.load.spritesheet("hearts", 'assets/Spritesheet_Hearts.png', { frameWidth:111, frameHeight: 42,});
        this.load.spritesheet("plusCoeur", 'assets/plusCoeur.png', { frameWidth:64, frameHeight: 70,});

        this.load.spritesheet("harpie", 'assets/Spritesheet_Harpie.png', { frameWidth:120, frameHeight: 121,});
        this.load.spritesheet("serpent", 'assets/Spritesheet_Serpent.png', { frameWidth:100, frameHeight: 98,});
        this.load.spritesheet("cameleon", 'assets/Spritesheet_Cameleon.png', { frameWidth:130, frameHeight: 110,});

        this.load.spritesheet("Dark", 'assets/Spritesheet_Dark.png', { frameWidth:896, frameHeight: 448,});

        this.load.image('OmbresPremierPlan', 'assets/OmbresPremierPlan.png');
        this.load.image('plante1', 'assets/plante1.png');
        this.load.image('plante2', 'assets/plante2.png');
        this.load.image('plante3', 'assets/plante3.png');
        this.load.image('plante4', 'assets/plante4.png');
        this.load.image('plante5', 'assets/plante5.png');
        this.load.image('plante6', 'assets/plante6.png');
        this.load.image('plante7', 'assets/plante7.png');
        this.load.image('plante8', 'assets/plante8.png');

        this.load.image('vide', 'assets/vide.png');

        this.load.image('acidD1', 'assets/acidD1.png');
        this.load.image('acidD2', 'assets/acidD2.png');
        this.load.image('acidD3', 'assets/acidD3.png');
        this.load.image('acidG1', 'assets/acidG1.png');
        this.load.image('acidG2', 'assets/acidG2.png');
        this.load.image('acidG3', 'assets/acidG3.png');

        this.load.spritesheet("eau", 'assets/Spritesheet_Eau.png', { frameWidth:32, frameHeight: 32,});
        this.load.image('racinesGauche', 'assets/racinesGauche.png');
        this.load.image('racinesDroite', 'assets/racinesDroite.png');

        this.load.image('mort', 'assets/Mort.png');
        this.load.image('victoire', 'assets/Victoire.png');
    }




    //////////////////////////////////////////// CREATE ////////////////////////////////////////////



    create ()
    {
        const map = this.make.tilemap({ key: 'map' });
        const tileset = map.addTilesetImage('tileset','tiles');

        var secondPlan = map.createLayer('fond', tileset, 0, 0);
        secondPlan.setDepth(1);

        var arrierePlan = map.createLayer('fond2', tileset, 0, 0);
        arrierePlan.setDepth(0);

        var premierPlan = map.createLayer('1erplan', tileset, 0, 0);
        premierPlan.setDepth(4);

        const wallLayer = map.createLayer('wall', tileset, 0, 0);
        wallLayer.setDepth(3)
        wallLayer.setCollisionByExclusion(-1, true);


        var harpieLocation = map.getObjectLayer('harpie').objects;
        this.harpies = this.physics.add.group({ Immovable:true, allowGravity:false});

        for (const harpie of harpieLocation) {
        this.harpies.create(harpie.x, harpie.y, 'harpie')
            .setDepth(4)
            .setScale(1)
            .setSize(100, 110)
            .setPushable(false)
        }
        //for (const harpie of harpies.children.entries) {
        //    harpie.isDed = false;
        //}

        var serpentLocation = map.getObjectLayer('serpent').objects;
        this.serpents = this.physics.add.group({ Immovable:true, allowGravity:false}); 

        for (const serpent of serpentLocation) {
        this.serpents.create(serpent.x, serpent.y, 'serpent')
            .setDepth(-1)
            .setScale(1)
            .setSize(40, 100)
            .setOffset(40, 0)
            .setPushable(false)
        }
        //for (const serpent of serpents.children.entries) {
        //    serpent.isDed = false;
        //}

        var cameleonLocation = map.getObjectLayer('cameleon').objects;
        this.cameleons = this.physics.add.group({ Immovable:true, allowGravity:true}); 

        for (const cameleon of cameleonLocation) {
        this.cameleons.create(cameleon.x, cameleon.y, 'cameleon')
            .setDepth(1)
            .setScale(1)
            .setSize(60, 65)
            .setOffset(25, 30)
            .setPushable(false)
        }
        //for (const cameleon of cameleons.children.entries) {
        //    cameleon.isDed = false;
        //}
        
        const coinLocation = map.getObjectLayer('coin').objects;
        coins = this.physics.add.group({ Immovable:true, allowGravity:false});

        for (const coin of coinLocation) {
        coins.create(coin.x, coin.y, 'coin')
            .setDepth(1)
            .setScale(1)
            .setSize(25, 25)
        }
        for (const coin of coins.children.entries) {
            //coin.isDed = false;
        }

        var eauLocation = map.getObjectLayer('eau').objects;
        this.eaus = this.physics.add.group({ Immovable:true, allowGravity:false});

        for (const eau of eauLocation) {
        this.eaus.create(eau.x, eau.y, 'eau')
            .setDepth(0)
            .setScale(1)
            .setPushable(false)
        }
        //for (const eau of eaus.children.entries) {
            //eau.isDed = false;
        //}

        var racinesGaucheLocation = map.getObjectLayer('racinesGauche').objects;
        this.racinesGauches = this.physics.add.group({allowGravity:false});

        for (const racinesGauche of racinesGaucheLocation) {
        this.racinesGauches.create(racinesGauche.x, racinesGauche.y, 'racinesGauche')
            .setDepth(0)
            .setScale(1)
            .setPushable(false)
        }

        var racinesDroiteLocation = map.getObjectLayer('racinesDroite').objects;
        this.racinesDroites = this.physics.add.group({allowGravity:false});

        for (const racinesDroite of racinesDroiteLocation) {
        this.racinesDroites.create(racinesDroite.x, racinesDroite.y, 'racinesDroite')
            //.setDepth(2)
            .setScale(1)
            .setPushable(false)
        }

        var victoireLocation = map.getObjectLayer('victoire').objects;
        this.victoires = this.physics.add.group({ Immovable:true, allowGravity:false});

        for (const victoire of victoireLocation) {
        this.victoires.create(victoire.x, victoire.y, 'vide')
            .setScale(1)
        }


        this.Dark = this.physics.add.sprite(448,224, 'Dark').setDepth(10).setScrollFactor(0).setScale(1);
        this.Dark.body.allowGravity = false;



        /*plante1 = this.add.image(100,224, 'plante1')
        .setScrollFactor(0.9, 0)
        plante2 = this.add.image(400,224, 'plante2')
        .setScrollFactor(1.2, 0)
        plante3 = this.add.image(250,224, 'plante3')
        .setScrollFactor(0.7, 0)
        plante4 = this.add.image(700,224, 'plante4')
        .setScrollFactor(2.4, 0)
        plante5 = this.add.image(1000,224, 'plante5')
        .setScrollFactor(0.9, 0)
        plante6 = this.add.image(620,224, 'plante6')
        .setScrollFactor(1.6, 0)
        plante7 = this.add.image(500,224, 'plante7')
        .setScrollFactor(0.4, 0)
        plante8 = this.add.image(300,224, 'plante8')
        .setScrollFactor(0.8, 0)*/


        this.victoire = this.add.image(448,224, 'victoire')
        .setScrollFactor(0)
        .setDepth(10)
        .setAlpha(0)

        this.mort = this.add.image(448,224, 'mort')
        .setScrollFactor(0)
        .setDepth(10)
        .setAlpha(0)


        this.OmbresPremierPlan = this.add.image(448,224, 'OmbresPremierPlan')
        .setScrollFactor(0)
        .setDepth(4)
        .setAlpha(1)

        this.hearts = this.physics.add.sprite(80,70, 'hearts')
        .setDepth(5)
        .setScrollFactor(0)
        .setScale(1);
        this.hearts.body.allowGravity = false;

        this.plusCoeur = this.physics.add.sprite(180,72, 'plusCoeur')
        .setDepth(5)
        .setScrollFactor(0)
        .setScale(0.5);
        this.plusCoeur.body.allowGravity = false;

        this.heatBar = this.physics.add.sprite(100,25, 'heatBar')
        .setDepth(5)
        .setScrollFactor(0)
        .setScale(1);
        this.heatBar.body.allowGravity = false;

        this.compteur = this.physics.add.sprite(840,25, 'compteur')
        .setDepth(5)
        .setScrollFactor(0)
        .setScale(1);
        this.compteur.body.allowGravity = false;

        player = this.physics.add.sprite(300, 1100, 'dude');
        player.setSize(40, 64,)
        player.setOffset(5, 8);
        player.setBounce(0);
        player.setDepth(1)


    

        // Luminosite 

        this.anims.create({
            key: 'Dark1',
            frames: [ { key: 'Dark', frame: 0 } ],
            frameRate: 5
        })

        this.anims.create({
            key: 'Dark2',
            frames: [ { key: 'Dark', frame: 1 } ],
            frameRate: 5
        })

        this.anims.create({
            key: 'Dark3',
            frames: [ { key: 'Dark', frame: 2 } ],
            frameRate: 5
        })


        // Update coeurs

        this.anims.create({
            key: '3coeurs',
            frames: [ { key: 'hearts', frame: 0 } ],
            frameRate: 5
        });

        this.anims.create({
            key: '2coeurs',
            frames: [ { key: 'hearts', frame: 1 } ],
            frameRate: 5
        });

        this.anims.create({
            key: '1coeur',
            frames: [ { key: 'hearts', frame: 2 } ],
            frameRate: 5
        });

        this.anims.create({
            key: '0coeur',
            frames: [ { key: 'hearts', frame: 3 } ],
            frameRate: 5
        });



        this.anims.create({
        key: 'plus',
        frames:     this.anims.generateFrameNumbers('plusCoeur', { start: 1, end: 10 }),
        frameRate: 8,
    });


    // Update chaleur

    this.anims.create({
        key: 'bar1',
        frames: [ { key: 'heatBar', frame: 0 } ],
        frameRate: 5
    });

    this.anims.create({
        key: 'bar2',
        frames: [ { key: 'heatBar', frame: 1 } ],
        frameRate: 5
    });

    this.anims.create({
        key: 'bar3',
        frames: [ { key: 'heatBar', frame: 2 } ],
        frameRate: 5
    });

    this.anims.create({
        key: 'bar4',
        frames: [ { key: 'heatBar', frame: 3 } ],
        frameRate: 5
    });

    this.anims.create({
        key: 'bar5',
        frames: [ { key: 'heatBar', frame: 4 } ],
        frameRate: 5
    });

    this.anims.create({
        key: 'bar6',
        frames: [ { key: 'heatBar', frame: 5 } ],
        frameRate: 5
    });

    // Update Pieces

    this.anims.create({
        key: 'compt0',
        frames: [ { key: 'compteur', frame: 0 } ],
        frameRate: 5
    });

    this.anims.create({
        key: 'compt1',
        frames: [ { key: 'compteur', frame: 1 } ],
        frameRate: 5
    });

    this.anims.create({
        key: 'compt2',
        frames: [ { key: 'compteur', frame: 2 } ],
        frameRate: 5
    });

    this.anims.create({
        key: 'compt3',
        frames: [ { key: 'compteur', frame: 3 } ],
        frameRate: 5
    });

    this.anims.create({
        key: 'compt4',
        frames: [ { key: 'compteur', frame: 4 } ],
        frameRate: 5
    });

    this.anims.create({
        key: 'compt5',
        frames: [ { key: 'compteur', frame: 5 } ],
        frameRate: 5
    });

    this.anims.create({
        key: 'compt6',
        frames: [ { key: 'compteur', frame: 6 } ],
        frameRate: 5
    });

    this.anims.create({
        key: 'compt7',
        frames: [ { key: 'compteur', frame: 7 } ],
        frameRate: 5
    });

    this.anims.create({
        key: 'compt8',
        frames: [ { key: 'compteur', frame: 8 } ],
        frameRate: 5
    });

    this.anims.create({
        key: 'compt9',
        frames: [ { key: 'compteur', frame: 9 } ],
        frameRate: 5
    });



   
    





    /* this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 0 } ],
        frameRate: 20
    }); */
    

    // Coins
    
    this.anims.create({
        key: 'coinFlip',
        frames: this.anims.generateFrameNumbers('coin', { start: 0, end: 3 }),
        frameRate: 5,
        repeat: -1
    });


    //Eau

    this.anims.create({
        key: 'eauSol',
        frames: this.anims.generateFrameNumbers('eau', { start: 0, end: 7 }),
        frameRate: 5,
        repeat: -1
    });

    //Harpies

    this.anims.create({
        key: 'volHarpie',
        frames: this.anims.generateFrameNumbers('harpie', { start: 0, end: 3 }),
        frameRate: 5,
        repeat: -1
    });

    // Serpents

    this.anims.create({
        key: 'statioSerpent',
        frames: this.anims.generateFrameNumbers('serpent', { start: 0, end: 6 }),
        frameRate: 2,
        repeat: -1
    });

    // Cameleons

    /*this.anims.create({
        key: 'cameleonLangue',
        frames: this.anims.generateFrameNumbers('cameleon', { start: 0, end: 2 }),
        frameRate: 1,
        repeat: -1
    });*/

    this.anims.create({
        key: 'cameleon1',
        frames: [ { key: 'cameleon', frame: 0 } ],
        frameRate: 5
    });

    this.anims.create({
        key: 'cameleon2',
        frames: [ { key: 'cameleon', frame: 1 } ],
        frameRate: 5
    });

    this.anims.create({
        key: 'cameleon3',
        frames: [ { key: 'cameleon', frame: 2 } ],
        frameRate: 5
    });


    //  Stationnaire

    this.anims.create({
        key: 'turn-right',
        frames: [ { key: 'dude', frame: 17 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'turn-left',
        frames: [ { key: 'dude', frame: 16 } ],
        frameRate: 20
    });


    // Sprint

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 10, end: 15 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 18, end: 23 }),
        frameRate: 10,
        repeat: -1
    });


    // Jump

    this.anims.create({
        key: 'jump-left',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 6 }),
        frameRate: 5,
    });

    this.anims.create({
        key: 'jump-right',
        frames: this.anims.generateFrameNumbers('dude', { start: 25, end: 26 }),
        frameRate: 5,
    });

    this.anims.create({
        key: 'chute-left',
        frames: [ { key: 'dude', frame: 7 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'chute-right',
        frames: [ { key: 'dude', frame: 27 } ],
        frameRate: 20
    });

    // Fireball

    this.anims.create({
        key: 'FB-left',
        frames: this.anims.generateFrameNumbers('dude', { start: 2, end: 3 }),
        frameRate: 2,
    });

    this.anims.create({
        key: 'FB-right',
        frames: this.anims.generateFrameNumbers('dude', { start: 30, end: 31 }),
        frameRate: 2,
    });

    this.anims.create({
        key: 'FB-left-air',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 1 }),
        frameRate: 2,
    });

    this.anims.create({
        key: 'FB-right-air',
        frames: this.anims.generateFrameNumbers('dude', { start: 32, end: 33 }),
        frameRate: 2,
    });



    


    cursors = this.input.keyboard.addKeys('Z,Q,S,D,up,down,right,left,P');
    



    fireballs = this.physics.add.group();



    bombs = this.physics.add.group({allowGravity:false});
    
    

    ///////////////  Colliders  ///////////////
    this.physics.add.collider(player, wallLayer);
    this.physics.add.collider(coins, wallLayer);
    this.physics.add.collider(bombs, wallLayer, bombHitSol, null, this);
    this.physics.add.collider(this.cameleons, wallLayer);

    this.physics.add.overlap(player, coins, collectcoin, null, this);
    this.physics.add.overlap(fireballs, coins, destroycoin, null, this);

    this.physics.add.overlap(player, bombs, hitMob, null, this);
    this.physics.add.overlap(player, this.harpies, hitMob, null, this);
    this.physics.add.overlap(player, this.serpents, hitMob, null, this);
    this.physics.add.overlap(player, this.cameleons, hitMob, null, this);
    this.physics.add.collider(player, this.racinesGauches, hitMob, null, this);
    this.physics.add.collider(player, this.racinesDroites, hitMob, null, this);

    this.physics.add.overlap(player, this.eaus, hitEau, null, this);

    this.physics.add.overlap(player, fireballs, playerHitFireball, null, this);
    this.physics.add.overlap(fireballs, this.harpies, hitFireball, null, this);
    this.physics.add.overlap(fireballs, this.serpents, hitFireball, null, this);
    this.physics.add.overlap(fireballs, this.cameleons, hitFireballCameleon, null, this);
    this.physics.add.overlap(fireballs, this.racinesGauches, hitFireball, null, this);
    this.physics.add.overlap(fireballs, this.racinesDroites, hitFireball, null, this);
    this.physics.add.collider(fireballs, wallLayer, hitwalls, null, this);

    this.physics.add.overlap(player, this.victoires, gagner, null, this);

    this.cameras.main.startFollow(player);
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    }









    //////////////////////////////////////////// UPDATE ////////////////////////////////////////////







    update ()
    {


        if (luminosite === 3)
        {
            this.Dark.anims.play('Dark1',true);
        }

        if (luminosite === 2)
        {
            this.Dark.anims.play('Dark2',true);
        }

        if (luminosite === 1)
        {
            this.Dark.anims.play('Dark3',true);
        }

    
    if (gameOver)
    {
        if (heat >= 6 )
        {
            player.setTint(0x0000FF);
        }
        this.mort.setAlpha(1);
        timedEvent5 = this.time.delayedCall(1000, timerMort, [], this);
    }

    if (victoire)
    {
        this.victoire.setAlpha(1);
        timedEvent6 = this.time.delayedCall(2000, timerVictoire, [], this);
    }


    for (const coin of coins.children.entries)
    {
        coin.anims.play('coinFlip',true);
    }

    for (const eau of this.eaus.children.entries)
    {
        eau.anims.play('eauSol',true);
    }


    cdHarpie -= 1;


    for (const harpie of this.harpies.children.entries)
    {
        harpie.anims.play('volHarpie',true);
        if (cdHarpie <= 200 )  // 400
        {
            harpie.setVelocityX(-100);
            harpie.setFlipX(false);
        }
        if (cdHarpie <= 0 )
        {
            cdHarpie = 400    // 400
            harpie.setVelocityX(100);
            harpie.setFlipX(true);
        }

        if (harpie.x < player.x & harpie.y+1000 < player.y)
        {
            harpie.destroy();
        }

        if (harpie.x+1000 < player.x)
        {
            harpie.destroy();
        }
    }

    

    cdSerpent -= 1;


    for (const serpent of this.serpents.children.entries)
    {
        serpent.anims.play('statioSerpent',true);
        if (cdSerpent <= 0 )
        {
            cdSerpent = 210;  // 500
            for (let i = 0; i < 6; i++)
            {
                var randomY = Math.floor(Math.random() *Math.floor((300) - (200))+(200));
                var randomX = Math.floor(Math.random() *Math.floor((100) - (-250))+(-250));

                if (i === 0)
                {
                    var bomb4 = bombs.create(serpent.x,serpent.y+40,'acidD1');
                    bomb4.setVelocityX(randomX);
                    bomb4.setVelocityY(randomY);
                    bomb4.setScale(3);
                }
                if (i === 1)
                {
                    var bomb5 = bombs.create(serpent.x,serpent.y+40,'acidD2');
                    bomb5.setVelocityX(randomX);
                    bomb5.setVelocityY(randomY);
                    bomb5.setScale(3);
                }
                if (i === 2)
                {
                    var bomb6 = bombs.create(serpent.x,serpent.y+40,'acidD3');
                    bomb6.setVelocityX(randomX);
                    bomb6.setVelocityY(randomY);
                    bomb6.setScale(3);
                }
                if (i === 3)
                {
                    var bomb7 = bombs.create(serpent.x,serpent.y+40,'acidG1');
                    bomb7.setVelocityX(randomX);
                    bomb7.setVelocityY(randomY);
                    bomb7.setScale(3);
                }
                if (i === 4)
                {
                    var bomb8 = bombs.create(serpent.x,serpent.y+40,'acidG2');
                    bomb8.setVelocityX(randomX);
                    bomb8.setVelocityY(randomY);
                    bomb8.setScale(3);
                }
                if (i === 5)
                {
                    var bomb9 = bombs.create(serpent.x,serpent.y+40,'acidG3');
                    bomb9.setVelocityX(randomX);
                    bomb9.setVelocityY(randomY);
                    bomb9.setScale(3);
                }
            }
        }
        // if (serpent.x+1000 < player.x || serpent.y+1000 < player.y) )
        // {
        //     serpent.destroy();
        // }
    }


    cdCameleon -= 1;

    

    for (const cameleon of this.cameleons.children.entries)
    {
        
        if ( cdCameleon > 200) //400
        {
            cameleon.anims.play('cameleon1',true);
        }

        if (cdCameleon <= 200 & cdCameleon > 100) // 400     200
        {
            cameleon.anims.play('cameleon2',true);
        }

        if (cdCameleon <= 100 & cdCameleon >0)      // 200     0
        {
            cameleon.anims.play('cameleon3',true);
            if (bombActive === false)
            {
                var bomb1 = bombs.create(cameleon.x+27, cameleon.y-25, 'vide');
                setTimeout(function(){bomb1.destroy();},1600)

                var bomb2 = bombs.create(cameleon.x+42, cameleon.y-35, 'vide');
                setTimeout(function(){bomb2.destroy();},1600)

                var bomb3 = bombs.create(cameleon.x+57, cameleon.y-46, 'vide');
                setTimeout(function(){bomb3.destroy();},1600)
                bombActive = true;
            }
        }

        if (cdCameleon <= 0)
        {
            //bomb1.destroy();
            //bomb2.destroy();
            //bomb3.destroy();
            cdCameleon = 300;  // 600
            bombActive = false;
        }

        if (cameleon.x+1800 < player.x /*|| cameleon.y+1000 < player.y*/)
        {
            cameleon.destroy();
            //bomb1.destroy();
            //bomb2.destroy();
            //bomb3.destroy();
        }
    }

    



    if (airborn === true)
    {
        player.setSize(40, 58,)
        player.setOffset(5, 14);
        if (direction === true & animBlock === false)
        {
            player.anims.play('chute-left', true);
        }
        else if (direction === false & animBlock === false)
        {
            player.anims.play('chute-right', true);
        }
    }
    else if (airborn === false)
    {
        player.setSize(40, 64,)
        player.setOffset(5, 8);
    }

    if (pv > 3)
    {
        pv = 3;
    }

    if (pv === 3)
    {
        this.hearts.anims.play('3coeurs',true);
    }

    if (pv === 2)
    {
        this.hearts.anims.play('2coeurs',true);
    }

    if (pv === 1)
    {
        this.hearts.anims.play('1coeur',true);
    }

    if (pv < 0)
    {
        pv = 0;
    }

    if (heat < 1)
    {
        heat = 1;
    }

    if (heat === 1)
    {
        this.heatBar.anims.play('bar1',true);
    }

    if (heat === 2)
    {
        this.heatBar.anims.play('bar2',true);
    }

    if (heat === 3)
    {
        this.heatBar.anims.play('bar3',true);
    }

    if (heat === 4)
    {
        this.heatBar.anims.play('bar4',true);
    }

    if (heat === 5)
    {
        this.heatBar.anims.play('bar5',true);
    }

    if (heat > 6)
    {
        heat = 6;
    }

    if (pieces === 0)
    {
        this.compteur.anims.play('compt0',true);
    }

    if (pieces === 1)
    {
        this.compteur.anims.play('compt1',true);
    }

    if (pieces === 2)
    {
        this.compteur.anims.play('compt2',true);
    }

    if (pieces === 3)
    {
        this.compteur.anims.play('compt3',true);
    }

    if (pieces === 4)
    {
        this.compteur.anims.play('compt4',true);
    }

    if (pieces === 5)
    {
        this.compteur.anims.play('compt5',true);
    }

    if (pieces === 6)
    {
        this.compteur.anims.play('compt6',true);
    }

    if (pieces === 7)
    {
        this.compteur.anims.play('compt7',true);
    }

    if (pieces === 8)
    {
        this.compteur.anims.play('compt8',true);
    }

    if (pieces === 9)
    {
        this.compteur.anims.play('compt9',true);
    }
    

    if (cursors.left.isDown || cursors.Q.isDown)
    {
        if(airborn === false & animBlock === false)
        {
            player.anims.play('left', true);
        }

        player.setVelocityX(-300);

        direction = true;
    }
    else if (cursors.right.isDown || cursors.D.isDown)
    {
        if(airborn === false & animBlock === false)
        {
            player.anims.play('right', true);
        }

        player.setVelocityX(300);

        direction = false;
    }
    else
    {
        player.setVelocityX(0);
        if (airborn === false)
            if (direction === true & animBlock === false)
            {
                player.anims.play('turn-left');
            }
            else if (direction === false & animBlock === false)
            {
                player.anims.play('turn-right');
            }
    }

    if (player.body.blocked.down)
    {
        doubleJump = true;
        airborn = false;
    }

    // if (cursors.P.isDown)
    // {
    //     if (pause === true)
    //     {
    //         pause = false;
    //         this.scene.resume("Level1");
    //         this.victoire.setAlpha(0);
    //     }
    //     else (pause === false)
    //     {
    //         pause = true;
    //         this.victoire.setAlpha(1);
    //         this.scene.pause("Level1");
    //     }
    // }

    if (cursors.P.isDown)
    {
        this.scene.pause("Level1");
        this.scene.start("OptionsGame");
    }


    if (cursors.up.isDown && player.body.blocked.down || cursors.Z.isDown && player.body.blocked.down)
    {
        animBlock = true;
        timedEvent3 = this.time.delayedCall(600, timerAnimBlock, [], this);
        
        if (direction === true)
        {
            player.anims.play('jump-left');
        }

        if (direction === false)
        {
            player.anims.play('jump-right');
        }

        airborn = true;

        player.setVelocityY(-250);

        timedEvent2 = this.time.delayedCall(600, timerDoubleJump, [], this);
    }

    if (cursors.up.isDown && doubleJump === true || cursors.Z.isDown && doubleJump === true)
    {
        doubleJump = false;
        airborn = true;
        animBlock = true;
        timedEvent3 = this.time.delayedCall(600, timerAnimBlock, [], this);
        
        if (direction === true)
        {
            player.anims.play('jump-left');
        }

        if (direction === false)
        {
            player.anims.play('jump-right');
        }

        player.setVelocityY(-250);
    }

    if ( (cursors.down.isDown && fireballActive === false) || (cursors.S.isDown && fireballActive === false) )
    {
        animBlock = true;
        timedEvent3 = this.time.delayedCall(300, timerAnimBlock, [], this);
        fireball = fireballs.create(player.x,player.y,'fireball')
        .setBounce(1);
        fireballActive = true;

        if(direction === false)
        {
            fireball.setVelocityX(450);
            if (airborn === false)
            {
                player.anims.play('FB-right');
            }
            else if (airborn === true)
            {
                player.anims.play('FB-right-air');
            }
        }
        else
        {
            fireball.setVelocityX(-450);
            if (airborn === false)
            {
                player.anims.play('FB-left');
            }
            else if (airborn === true)
            {
                player.anims.play('FB-left-air');
            }
        }
    }
}
}



function destroycoin(fireball,coin)
{
    /*fireball.destroy();
    fireballActive = false;
    bounceCount = 0;*/

    coin.destroy();
    pieces += 1;
    if(pieces === 10)
    {
        pv += 1;
        pieces = 0;
        this.plusCoeur.anims.play('plus',true);
    }
}

function hitFireball(fireball, mob)
{
    fireball.destroy();
    fireballActive = false;
    bounceCount = 0;
    mob.destroy();
}

function hitFireballCameleon(fireball, mob)
{
    fireball.destroy();
    fireballActive = false;
    bounceCount = 0;
    mob.destroy();
    /*if (cdCameleon <= 100)    // 200
    {
        bomb1.destroy();
        bomb2.destroy();
        bomb3.destroy();
    }*/
}

function hitEau(player, eau)
{
    if (invincibilityEau === false)
    {
        invincibilityEau = true;
        
        heat +=2;

        player.setTint(0x8888ff);
    }

    if ( heat < 6)
    {
        timedEvent4 = this.time.delayedCall(1500, timerInvincibilityEau, [], this);
    }

    if ( heat >= 6)
        {
            this.heatBar.anims.play('bar6',true);
                    
            if (direction === true )
            {
                player.anims.play('turn-left');
            }
            else if (direction === false )
            {
                player.anims.play('turn-right');
            }
                
            this.physics.pause();
            
            player.setTint(0x0000FF);
            
            gameOver = true;
        }
}

function playerHitFireball(player, fireball)
{
    if (bounceCount === 1 & !invincibility)
    {
        fireball.destroy();
        fireballActive = false;
        bounceCount = 0;

        pv -= 1;

        heat -= 2;
        
        player.setTint(0xff8888);
        
        invincibility = true;
    
        if ( pv > 0)
        {
            timedEvent1 = this.time.delayedCall(1500, timerInvincibility, [], this);
        }
        

        if ( pv == 0)
        {
            this.hearts.anims.play('0coeur',true);
                    
            if (direction === true )
            {
                player.anims.play('turn-left');
            }
            else if (direction === false )
            {
                player.anims.play('turn-right');
            }
                
            this.physics.pause();
            
            player.setTint(0xaa0000);
            
            gameOver = true;   
        }
    }
}

function hitwalls(fireball,wallLayer)
{
    bounceCount++
    if(bounceCount == 2)
    {
        fireball.destroy();
        fireballActive = false;
        bounceCount = 0;
    }
}


function collectcoin (player, coin)
{
    coin.disableBody(true, true);

    pieces += 1;
    if(pieces === 10)
    {
        pv += 1;
        pieces = 0;
        this.plusCoeur.anims.play('plus',true);
    }
}

function bombHitSol(bomb)
{
    bomb.destroy();
}



function hitMob (player, Mob)
{
    if (!invincibility)
    {
      
        pv -= 1;
        
        player.setTint(0xff8888);
        
        invincibility = true;
        
        if ( pv > 0)
            {
                timedEvent1 = this.time.delayedCall(1500, timerInvincibility, [], this);
            }
        
    
        if ( pv == 0)
            {
                this.hearts.anims.play('0coeur',true);

                if (direction === true )
                {
                    player.anims.play('turn-left');
                }
                else if (direction === false )
                {
                    player.anims.play('turn-right');
                }
                
                this.physics.pause();
            
                player.setTint(0xaa0000);
            
                gameOver = true;
            }  
    }
}



function gagner()
{
    victoire = true;
}

function timerDoubleJump()
{
    doubleJump = true;
}

function timerInvincibility ()
{
    invincibility = false;
    
    player.setTint(0xffffff)
}

function timerInvincibilityEau ()
{
    invincibilityEau = false;
    
    
    if (heat >= 4)
    {
        player.setTint(0xccccff);
    }
    else
    {
        player.setTint(0xffffff);
    }
}

function timerAnimBlock()
{
    animBlock = false;
}

function timerMort()
{
    this.scene.start("Level1");
}

function timerVictoire()
{
    this.scene.start("MenuJeu");
}