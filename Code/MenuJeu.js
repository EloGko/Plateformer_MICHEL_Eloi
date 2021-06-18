class MenuJeu extends Phaser.Scene {

    constructor(){
        super("MenuJeu");
    }

    init(data){
        
    }

    preload(){

        this.load.image('Bouton_Play','assets/Bouton_Play.png');
        this.load.image('Bouton_Option','assets/Bouton_Option.png');

    }

    create() {
        //this.add.text(20,20, "Loading Game ...");

        var buttonPlay = this.add.sprite(500, 259, 'Bouton_Play').setScrollFactor(0).setInteractive({ cursor: 'pointer' });

        var buttonOption = this.add.sprite(500, 349, 'Bouton_Option').setScrollFactor(0).setInteractive({ cursor: 'pointer' });

        buttonPlay.on('pointerdown', function(){
    
            this.scene.start("Level1");

        }, this);
        //this.scene.start(Level1)
    }
}