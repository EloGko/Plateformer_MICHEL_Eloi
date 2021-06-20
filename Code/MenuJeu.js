class MenuJeu extends Phaser.Scene {

    constructor(){
        super("MenuJeu");
    }

    init(data){
        
    }

    preload(){

        this.load.image('Bouton_Play','assets/Bouton_Play.png');
        this.load.image('Bouton_Option','assets/Bouton_Option.png');
        this.load.image('Fond','assets/Menu_Fond.png');
        this.load.image('Feuilles','assets/Menu_Feuille.png');
        this.load.image('Titre','assets/Menu_Titre.png');

        this.load.spritesheet("Dark", 'assets/Spritesheet_Dark.png', { frameWidth:896, frameHeight: 448,});
    }

    create() {
        this.add.image(448,224, 'Fond').setScrollFactor(0).setDepth(1);
        this.add.image(448,224, 'Feuilles').setScrollFactor(0).setDepth(3);
        this.add.image(448,131, 'Titre').setScrollFactor(0).setDepth(2);

        this.Dark = this.physics.add.sprite(448,224, 'Dark').setDepth(10).setScrollFactor(0).setScale(1);
        this.Dark.body.allowGravity = false;


        var buttonPlay = this.add.sprite(448, 297, 'Bouton_Play').setScrollFactor(0).setDepth(2).setInteractive({ cursor: 'pointer' });

        var buttonOptions = this.add.sprite(448, 387, 'Bouton_Option').setScrollFactor(0).setDepth(2).setInteractive({ cursor: 'pointer' });

        buttonPlay.on('pointerdown', function(){
    
            this.scene.start("Level1");

        }, this);

        buttonOptions.on('pointerdown', function(){
    
            this.scene.start("Options");

        }, this);

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
    }





    update(){

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

        
    }


}

/*function render() {

    //  FPS debug info
    game.debug.text('FPS: ' + game.time.fps || 'FPS: --', 40, 40, "#00ff00");

}*/