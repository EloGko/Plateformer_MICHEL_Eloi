class OptionsGame extends Phaser.Scene {

    constructor(){
        super("OptionsGame");
    }

    init(data){
        
    }

    preload(){

        this.load.image('Bouton_Brightness','assets/Bouton_Brightness.png');
        this.load.image('Bouton_Controls','assets/Bouton_Controls.png');
        this.load.image('+','assets/+.png');
        this.load.image('-','assets/-.png');
        this.load.image('Bouton_Back','assets/Bouton_Back.png');
        this.load.image('Fond','assets/Menu_Fond.png');
        this.load.image('Feuilles','assets/Menu_Feuille.png');
        this.load.image('ControlsInfos','assets/Controls_Infos.png');

        this.load.spritesheet("BarBrightness", 'assets/Spritesheet_Bar_Brightness.png', { frameWidth:600, frameHeight: 228,});
        this.load.spritesheet("Dark", 'assets/Spritesheet_Dark.png', { frameWidth:896, frameHeight: 448,});
    }

    create() {
        this.add.image(448,224, 'Fond').setScrollFactor(0).setDepth(1);
        this.add.image(448,224, 'Feuilles').setScrollFactor(0).setDepth(3);
        

        this.BarBrightness = this.physics.add.sprite(448,131, 'BarBrightness').setDepth(2).setScrollFactor(0).setScale(1);
        this.BarBrightness.body.allowGravity = false;

        this.Dark = this.physics.add.sprite(448,224, 'Dark').setDepth(5).setScrollFactor(0).setScale(1);
        this.Dark.body.allowGravity = false;

        var buttonBrightness = this.add.sprite(448, 297, 'Bouton_Brightness').setScrollFactor(0).setDepth(2).setAlpha(0.5).setInteractive({ cursor: 'pointer' });
        var buttonControls = this.add.sprite(448, 387, 'Bouton_Controls').setScrollFactor(0).setDepth(2).setInteractive({ cursor: 'pointer' });
        var buttonBack = this.add.sprite(80, 415, 'Bouton_Back').setScrollFactor(0).setDepth(4).setInteractive({ cursor: 'pointer' });

        var buttonPlus = this.add.sprite(671, 132, '+').setScrollFactor(0).setDepth(2).setInteractive({ cursor: 'pointer' });
        var buttonMinus = this.add.sprite(214, 138, '-').setScrollFactor(0).setDepth(2).setInteractive({ cursor: 'pointer' });

        var ControlsInfos = this.add.sprite(448,131, 'ControlsInfos').setScrollFactor(0).setDepth(2).setAlpha(0);




        buttonBrightness.on('pointerdown', function(){
    
            buttonBrightness.setAlpha(0.5);
            buttonControls.setAlpha(1);
            buttonMinus.setAlpha(1);
            buttonPlus.setAlpha(1);
            this.BarBrightness.setAlpha(1);
            ControlsInfos.setAlpha(0);

        }, this);

        buttonControls.on('pointerdown', function(){
    
            buttonControls.setAlpha(0.5);
            buttonBrightness.setAlpha(1);
            buttonMinus.setAlpha(0);
            buttonPlus.setAlpha(0);
            this.BarBrightness.setAlpha(0);
            ControlsInfos.setAlpha(1);

        }, this);



        buttonPlus.on('pointerdown', function(){
    
            if (luminosite < 3)
            {
                luminosite += 1;
            }

        }, this);

        buttonMinus.on('pointerdown', function(){
    
            if (luminosite > 1)
            {
                luminosite -= 1;
            }

        }, this);



        buttonBack.on('pointerdown', function(){

            this.scene.start("MenuJeu");

            // this.scene.resume("Level1");

        }, this);


        ////////// Animations //////////

        this.anims.create({
            key: 'BarBrightness3',
            frames: [ { key: 'BarBrightness', frame: 0 } ],
            frameRate: 5
        })

        this.anims.create({
            key: 'BarBrightness2',
            frames: [ { key: 'BarBrightness', frame: 1 } ],
            frameRate: 5
        })

        this.anims.create({
            key: 'BarBrightness1',
            frames: [ { key: 'BarBrightness', frame: 2 } ],
            frameRate: 5
        })



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
            this.BarBrightness.anims.play('BarBrightness3',true);
            this.Dark.anims.play('Dark1',true);
        }

        if (luminosite === 2)
        {
            this.BarBrightness.anims.play('BarBrightness2',true);
            this.Dark.anims.play('Dark2',true);
        }

        if (luminosite === 1)
        {
            this.BarBrightness.anims.play('BarBrightness1',true);
            this.Dark.anims.play('Dark3',true);
        }
    }


}