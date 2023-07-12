namespace SpriteKind {
    export const Boss = SpriteKind.create()
    export const EnemyProjectile = SpriteKind.create()
    export const Title = SpriteKind.create()
}
namespace StatusBarKind {
    export const BossHealth = StatusBarKind.create()
}
namespace ConnectionKind {
    export const Door3 = ConnectionKind.create()
    export const Door4 = ConnectionKind.create()
}
function map1end () {
    tiles.setTileAt(tiles.getTileLocation(4, 8), assets.tile`tile16`)
    pause(1000)
    tiles.setTileAt(tiles.getTileLocation(4, 8), assets.tile`tile3`)
    teleportStart()
    music.beamUp.play()
    pause(500)
    mySprite.setPosition(72, 120)
    teleportEnd()
    tiles.setTileAt(tiles.getTileLocation(4, 8), assets.tile`tile15`)
    spawn = true
}
function createBoss () {
    if (spawn == true) {
        bossActive = true
        alienCount += 1
        boss = sprites.create(img`
            ........ffffffff........
            ....fffffaaaaaafffff....
            ..ffaaafaffffffafaaaff..
            .faaafffffaaaafffffaaaf.
            .fafffaffcaaaacffafffaf.
            .fffaaafaaaaaaaafaaafff.
            .fcccaafaaaaaaaafaacccf.
            facccaffccccccccffacccaf
            facccfaaafccccfaaafcccaf
            ffffaafffcffffcfffaaffff
            .faaffaf.ffaaff.faffaaf.
            ..fa.faf..faf...faf.af..
            .aaf..faf..faa.faf..faa.
            .faf.afaf..faf.fafa.faf.
            ..fa.faf..faf...faf.af..
            ..faf.f...faf....f.faf..
            .faaf.....faaf.....faaf.
            ..ff.......ff.......ff..
            `, SpriteKind.Boss)
        bossHP = statusbars.create(18, 4, StatusBarKind.BossHealth)
        bossHP.setBarBorder(1, 13)
        bossHP.setColor(2, 11)
        bossHP.attachToSprite(boss, 3, 0)
        bossHP.max = 20
        boss.setBounceOnWall(true)
        music.sonar.loop()
        for (let value of tiles.getTilesByType(assets.tile`myTile`)) {
            tiles.placeOnTile(boss, value)
        }
        if (Math.percentChance(50)) {
            boss.setVelocity(alienSpeed, 0)
        } else {
            boss.setVelocity(alienSpeed * -1, 0)
        }
        while (alienCount != 0) {
            pause(1000)
            projectile = sprites.createProjectileFromSprite(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . 5 . . . . . . . 
                . . . . . . . 4 5 . . . . . . . 
                . . . . . . . 4 5 . . . . . . . 
                . . . . . . 4 5 1 4 . . . . . . 
                . . . . . . 4 5 1 4 . . . . . . 
                . . . . . . . 4 5 4 . . . . . . 
                . . . . . . . 4 4 . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, boss, 0, 100)
            projectile.setKind(SpriteKind.EnemyProjectile)
            projectile.setFlag(SpriteFlag.GhostThroughSprites, true)
            pause(200)
            projectile.setFlag(SpriteFlag.GhostThroughSprites, false)
            animation.runImageAnimation(
            projectile,
            [img`
                . . . . . . . . 5 . . . . . . . 
                . . . . . . . 4 5 . . . . . . . 
                . . . . . . . 4 5 . . . . . . . 
                . . . . . . 4 5 1 4 . . . . . . 
                . . . . . . 4 5 1 4 . . . . . . 
                . . . . . . . 4 5 4 . . . . . . 
                . . . . . . . 4 4 . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `,img`
                . . . . . . . 5 . . 4 . . . . . 
                . . . . . . . 5 4 . 4 . . . . . 
                . . . . . . . 5 4 . . . . . . . 
                . . . . . . 4 1 5 4 . . . . . . 
                . . . . . . 4 1 5 4 . . . . . . 
                . . . . . . 4 5 4 . . . . . . . 
                . . . . . . . 4 4 . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `,img`
                . . . . . 4 . . 5 . . . . . . . 
                . . . . . . . 4 5 . . . . . . . 
                . . . . . . . 4 5 . . . . . . . 
                . . . . . . 4 5 1 4 . . . . . . 
                . . . . . . 4 5 1 4 . . . . . . 
                . . . . . . . 4 5 4 . . . . . . 
                . . . . . . . 4 4 . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `,img`
                . . . . . . . 5 . . . . . . . . 
                . . . . . . . 5 4 . 4 . . . . . 
                . . . . . . . 5 4 . . . . . . . 
                . . . . . . 4 1 5 4 . . . . . . 
                . . . . . . 4 1 5 4 . . . . . . 
                . . . . . . 4 5 4 . . . . . . . 
                . . . . . . . 4 4 . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `],
            200,
            false
            )
            music.pewPew.play()
            pause(alienSpeed * 3)
        }
    }
}
function map2start () {
    if (tiles.getLoadedMap() == map2) {
        createAlien()
        alien.setPosition(50, 148)
        createAlien()
        alien.setPosition(80, 148)
        alien.setVelocity(30, randint(20, 30))
    }
}
sprites.onOverlap(SpriteKind.EnemyProjectile, SpriteKind.Player, function (sprite, otherSprite) {
    if (controller.B.isPressed()) {
        projectile.vy = -100
        animation.runImageAnimation(
        projectile,
        [img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . . . 4 5 4 . . . . . . 
            . . . . . . 4 5 1 4 . . . . . . 
            . . . . . . 4 5 1 4 . . . . . . 
            . . . . . . . 4 5 . . . . . . . 
            . . . . . . . 4 5 . . . . . . . 
            . . . . . . . . 5 . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . . 4 5 4 . . . . . . . 
            . . . . . . 4 1 5 4 . . . . . . 
            . . . . . . 4 1 5 4 . . . . . . 
            . . . . . . . 5 4 . . . . . . . 
            . . . . . . . 5 4 . 4 . . . . . 
            . . . . . . . 5 . . 4 . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . . . 4 5 4 . . . . . . 
            . . . . . . 4 5 1 4 . . . . . . 
            . . . . . . 4 5 1 4 . . . . . . 
            . . . . . . . 4 5 . . . . . . . 
            . . . . . . . 4 5 . . . . . . . 
            . . . . . 4 . . 5 . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . . 4 5 4 . . . . . . . 
            . . . . . . 4 1 5 4 . . . . . . 
            . . . . . . 4 1 5 4 . . . . . . 
            . . . . . . . 5 4 . . . . . . . 
            . . . . . . . 5 4 . 4 . . . . . 
            . . . . . . . 5 . . . . . . . . 
            `],
        200,
        false
        )
    } else {
        info.changeLifeBy(-1)
        scene.cameraShake(4, 500)
        mySprite.setPosition(mySprite.x, mySprite.y + 20)
        mySprite.setImage(spriteSheet[4])
        music.zapped.play()
        pause(100)
        mySprite.setImage(spriteSheet[0])
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`tile28`, function (sprite, location) {
    level += -1
    alienSpeed += -5
    spawn = false
    tiles.loadMap(tilemaps[level])
    mySprite.setPosition(72, 45)
})
function knockback3 (value: Sprite) {
    music.sonar.stop()
    scene.cameraShake(3, 100)
    music.bigCrash.play()
    if (Math.percentChance(50)) {
        animation.runImageAnimation(
        value,
        [img`
            ........ffffffff.......b
            ....fffffaaaaaafffff..b1
            ..ffaaafaffffffafaaafb11
            .faaafffffaaaafffffaa11b
            .fafffaffcaaaacffaffb11.
            .fffaaafaaaaaaaafaab11b.
            .fcccaafaaaaaaaafbb11bf.
            facccaffcccccccbb111bcaf
            facccfaaafccccb111bbccaf
            ffffaafffcfbbb111baaffff
            .faaffaf.fb1111bfaffaaf.
            ..fa.faf.b11bbb.faf.af..
            .aac.bbbb11baa.faf..faa.
            .fabb11111bfaf.fafa.faf.
            ab11111bbbfaf...faf.af..
            111bbbb...faf....f.faf..
            .faaf.....faaf.....faaf.
            ..ff.......ff.......ff..
            `,img`
            ........ffffffff.......b
            ....fffffaaaaaafffff..b1
            ..ffaaafaffffffafaaafb11
            .faaafffffaaaafffffaa11b
            .fafffaffcaaaacffaffb11.
            .fffaaafaaaaaaaafaab11b.
            .fcccaafaaaaaaaafaa11bf.
            facccaffccccccccffa1bcaf
            facccfaaafccccfaaafbccaf
            ffffaafffcffffcfffaaffff
            .faaffaf.ffaaff.faffaaf.
            ..fa.faf..faf...faf.af..
            .aac.bfaf..faa.faf..faa.
            .fabbafaf..faf.fafa.faf.
            ab111fa...faf...faf.af..
            111bb.f...faf....f.faf..
            .faaf.....faaf.....faaf.
            ..ff.......ff.......ff..
            `,img`
            ........ffffffff........
            ....fffffaaaaaafffff....
            ..ffaaafaffffffafaaaff..
            .faaafffffaaaafffffaaaf.
            .fafffaffcaaaacffafffaf.
            .fffaaafaaaaaaaafaaafff.
            .fcccaafaaaaaaaafaacccf.
            facccaffccccccccffacccaf
            facccfaaafccccfaaafcccaf
            ffffaafffcffffcfffaaffff
            .faaffaf.ffaaff.faffaaf.
            ..fa.faf..faf...faf.af..
            .aaf..faf..faa.faf..faa.
            .faf.afaf..faf.fafa.faf.
            ..fa.faf..faf...faf.af..
            ..faf.f...faf....f.faf..
            .faaf.....faaf.....faaf.
            ..ff.......ff.......ff..
            `],
        100,
        false
        )
    } else {
        animation.runImageAnimation(
        value,
        [img`
            b.......ffffffff........
            1b..fffffaaaaaafffff....
            11bfaaafaffffffafaaaff..
            b11aafffffaaaafffffaaaf.
            .11bffaffcaaaacffafffaf.
            .b11baafaaaaaaaafaaafff.
            .fb11bbfaaaaaaaafaacccf.
            facb111bbcccccccffacccaf
            faccbb111bccccfaaafcccaf
            ffffaab111bbbfcfffaaffff
            .faaffafb1111bf.faffaaf.
            ..fa.faf.bbb11b.faf.af..
            .aaf..faf.aab11bbbb.caa.
            .faf.afaf.fafb11111bbaf.
            ..fa.faf...fafbbb11111ba
            ..faf.f....faf...bbbb111
            .faaf.....faaf.....faaf.
            ..ff.......ff.......ff..
            `,img`
            b.......ffffffff........
            1b..fffffaaaaaafffff....
            11bfaaafaffffffafaaaff..
            b11aafffffaaaafffffaaaf.
            .11bffaffcaaaacffafffaf.
            .b11baafaaaaaaaafaaafff.
            .fb11aafaaaaaaaafaacccf.
            facb1affccccccccffacccaf
            faccbfaaafccccfaaafcccaf
            ffffaafffcffffcfffaaffff
            .faaffaf.ffaaff.faffaaf.
            ..fa.faf..faf...faf.af..
            .aaf..faf..faa.fafb.caa.
            .faf.afaf..faf.fafabbaf.
            ..fa.faf..faf...faf111ba
            ..faf.f...faf....f.bb111
            .faaf.....faaf.....faaf.
            ..ff.......ff.......ff..
            `,img`
            ........ffffffff........
            ....fffffaaaaaafffff....
            ..ffaaafaffffffafaaaff..
            .faaafffffaaaafffffaaaf.
            .fafffaffcaaaacffafffaf.
            .fffaaafaaaaaaaafaaafff.
            .fcccaafaaaaaaaafaacccf.
            facccaffccccccccffacccaf
            facccfaaafccccfaaafcccaf
            ffffaafffcffffcfffaaffff
            .faaffaf.ffaaff.faffaaf.
            ..fa.faf..faf...faf.af..
            .aaf..faf..faa.faf..faa.
            .faf.afaf..faf.fafa.faf.
            ..fa.faf..faf...faf.af..
            ..faf.f...faf....f.faf..
            .faaf.....faaf.....faaf.
            ..ff.......ff.......ff..
            `],
        100,
        false
        )
    }
    if (controller.B.isPressed() == false) {
        statusbars.getStatusBarAttachedTo(StatusBarKind.BossHealth, value).value += -1
    }
}
statusbars.onZero(StatusBarKind.BossHealth, function (status) {
    music.sonar.stop()
    animation.runImageAnimation(
    status.spriteAttachedTo(),
    [img`
        ........ffffffff........
        ....fffffaaaaaafffff....
        ..ffaaafaffffffafaaaff..
        .faaafffffaaaafffffaaaf.
        .fafffaffcaaaacffafffaf.
        .fffaaafaaaaaaaafaaafff.
        .fcccaafaaaaaaaafaacccf.
        facccaffccccccccffacccaf
        facccfaaafccccfaaafcccaf
        ffffaafffcffffcfffaaffff
        .faaffaf.ffaaff.faffaaf.
        ..fa.faf..faf...faf.af..
        .aaf..faf..faa.faf..faa.
        .faf.afaf..faf.fafa.faf.
        ..fa.faf..faf...faf.af..
        ..faf.f...faf....f.faf..
        .faaf.....faaf.....faaf.
        ..ff.......ff.......ff..
        `,img`
        ........ffffffff........
        ....fffffaaaaaafffff....
        ..ffaaafaffffffafaaaff..
        .faaafffffaaaafffffaaaf.
        .fafffaffcaaaacffafffaf.
        .fffaaafaaabbaaafaaafff.
        .fcccaafaabddbaafaacccf.
        facccaffcbd11dbcffacccaf
        facccfaaabd11dbaaafcccaf
        ffffaafffcbddbcfffaaffff
        .faaffaf.ffbbff.faffaaf.
        ..fa.faf..faf...faf.af..
        .aaf..faf..faa.faf..faa.
        .faf.afaf..faf.fafa.faf.
        ..fa.faf..faf...faf.af..
        ..faf.f...faf....f.faf..
        .faaf.....faaf.....faaf.
        ..ff.......ff.......ff..
        `,img`
        ........ffffffff........
        ....fffffaaaaaafffff....
        ..ffaaafaffffffafaaaff..
        .faaafffffbbbbfffffaaaf.
        .fafffaffbbddbbffafffaf.
        .fffaaafbdd11ddbfaaafff.
        .fcccaabbd1111dbbaacccf.
        facccafbd111111dbfacccaf
        facccfabd111111dbafcccaf
        ffffaafbd111111dbfaaffff
        .faaffafbdd111dbfaffaaf.
        ..fa.faf.bbdddb.faf.af..
        .aaf..faf.bbbb.faf..faa.
        .faf.afaf..faf.fafa.faf.
        ..fa.faf..faf...faf.af..
        ..faf.f...faf....f.faf..
        .faaf.....faaf.....faaf.
        ..ff.......ff.......ff..
        `,img`
        ........ffffffff........
        ....fffffaaaaaafffff....
        ..ffaaafafbbbbfafaaaff..
        .faaafffbbdddbbffffaaaf.
        .fafffabdd111ddbfafffaf.
        .fffaabd1111111dbaaafff.
        .fcccabd1111111dbbacccf.
        facccabd11111111dbacccaf
        facccfbd11111111dbfcccaf
        ffffaabbd1111111dbaaffff
        .faaffabd1111111baffaaf.
        ..fa.fafbd111dddbaf.af..
        .aaf..fafbdddbbbaf..faa.
        .faf.afaf.bbbb.fafa.faf.
        ..fa.faf..faf...faf.af..
        ..faf.f...faf....f.faf..
        .faaf.....faaf.....faaf.
        ..ff.......ff.......ff..
        `,img`
        ........ffffffff........
        ....fffffaaaaaafffff....
        ..ffaaafafbbbbbbfaaaff..
        .faaafffbbbdddbbbffaaaf.
        .fafffbbbdd111ddbafffaf.
        .fffaabbd1111111dbaafff.
        .fcccbbd11111111dbacccf.
        facccbd1111111111dbcccaf
        facccbd1111111111dbcccaf
        ffffabd1111111111dbaffff
        .faaffbd11111111dbbfaaf.
        ..fa.fbd11111111dbb.af..
        .aaf..bdd11111ddbb..faa.
        .faf.afbbdddddbbafa.faf.
        ..fa.fafbbbbbbb.faf.af..
        ..faf.f..bbbb....f.faf..
        .faaf.....faaf.....faaf.
        ..ff.......ff.......ff..
        `,img`
        ........ffffffff........
        ....fffffbbbbbbbbfff....
        ..ffaaabbddddddbbbaaff..
        .faaafbbd111111ddbbaaaf.
        .fafffbd111111111dbbfaf.
        .fffabbd1111111111ddbff.
        .fcccbd111111111111dbcf.
        facccbd111111111111dbcaf
        facccbd111111111111dbcaf
        ffffabd111111111111dbfff
        .faafbd11111111111dbbaf.
        ..fa.bd11111111111dbbf..
        .aaf.bbd111111111dbbbaa.
        .faf.bbbddd111111dbbfaf.
        ..fa.fbbbbbddddddbbbaf..
        ..faf.f.bbbbbbbbbb.faf..
        .faaf....bbbbb.....faaf.
        ..ff.......ff.......ff..
        `,img`
        ......bbbbbbbb..........
        ....bbdddddddddbbbb.....
        ...bbd111111111dddbb....
        ...bd1111111111111ddd...
        ..bbd111111111111111db..
        ..bd1111111111111111ddb.
        ..bd11111111111111111db.
        ..b111111111111111111db.
        ..b111111111111111111db.
        ..b111111111111111111db.
        ..b11111111111111111dbb.
        ..b11111111111111111dbb.
        ..b11111111111111111dbb.
        ...bd111111111111111db..
        ...bd11111111111111dbb..
        ...bbd1111111111dddbb...
        ...bbbddd111111dbbbb....
        ....bbbbbddddddbbb......
        `,img`
        ........................
        .........bbbbbbbb.......
        .......bbddddddbbb......
        ......bbd111111ddbb.....
        ......bd111111111dbb....
        .....bbd1111111111ddb...
        .....bd111111111111db...
        .....bd111111111111db...
        .....bd111111111111db...
        .....bd111111111111db...
        .....bd11111111111dbb...
        .....bd11111111111dbb...
        .....bbd111111111dbbb...
        .....bbbddd111111dbb....
        ......bbbbbddddddbbb....
        ........bbbbbbbbbb......
        .........bbbbb..........
        ........................
        `,img`
        ........................
        ........................
        ..........bbbbbb........
        ........bbbdddbbb.......
        ......bbbdd111ddb.......
        ......bbd1111111db......
        .....bbd11111111db......
        .....bd1111111111db.....
        .....bd1111111111db.....
        .....bd1111111111db.....
        ......bd11111111dbb.....
        ......bd11111111dbb.....
        ......bdd11111ddbb......
        .......bbdddddbb........
        ........bbbbbbb.........
        .........bbbb...........
        ........................
        ........................
        `,img`
        ........................
        ........................
        ..........bbbb..........
        ........bbdddbb.........
        .......bdd111ddb........
        ......bd1111111db.......
        ......bd1111111dbb......
        ......bd11111111db......
        ......bd11111111db......
        ......bbd1111111db......
        .......bd1111111b.......
        ........bd111dddb.......
        .........bdddbbb........
        ..........bbbb..........
        ........................
        ........................
        ........................
        ........................
        `,img`
        ........................
        ........................
        ........................
        ..........bbbb..........
        .........bbddbb.........
        ........bdd11ddb........
        .......bbd1111dbb.......
        .......bd111111db.......
        .......bd111111db.......
        .......bd111111db.......
        ........bdd111db........
        .........bbdddb.........
        ..........bbbb..........
        ........................
        ........................
        ........................
        ........................
        ........................
        `,img`
        ........................
        ........................
        ........................
        ........................
        ........................
        ...........bb...........
        ..........bddb..........
        .........bd11db.........
        .........bd11db.........
        ..........bddb..........
        ...........bb...........
        ........................
        ........................
        ........................
        ........................
        ........................
        ........................
        ........................
        `,img`
        ........................
        ........................
        ........................
        ........................
        ........................
        ........................
        ........................
        ........................
        ........................
        ........................
        ........................
        ........................
        ........................
        ........................
        ........................
        ........................
        ........................
        ........................
        `],
    150,
    false
    )
    pause(500)
    alienCount += -1
    status.spriteAttachedTo().destroy()
    info.changeScoreBy(10)
    music.sonar.stop()
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (gameStart == false) {
        mySprite.setImage(spriteSheet[3])
        magicshield = sprites.createProjectileFromSprite(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, mySprite, 0, 0)
        magicshield.follow(mySprite)
        shieldup()
    }
})
function spell () {
    music.smallCrash.play()
    animation.runImageAnimation(
    magicbeam,
    [img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . 6 6 6 6 . . . . . . 
        . . . . . 6 9 9 9 9 6 . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . 6 6 6 6 . . . . . . 
        . . . 6 6 9 9 9 9 9 9 6 6 . . . 
        . . 6 9 9 6 6 6 6 6 6 9 9 6 . . 
        . 6 9 6 6 . . . . . . 6 6 9 6 . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . 6 6 6 6 . . . . . . 
        . . . 6 6 9 9 9 9 9 9 6 6 . . . 
        . . 6 9 9 6 6 6 6 6 6 9 9 6 . . 
        . 6 9 6 6 . . . . . . 6 6 9 6 . 
        . 9 6 . . . . . . . . . . 6 9 . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . 6 6 6 6 . . . . . . 
        . . . . 6 9 9 9 9 9 9 6 . . . . 
        . . 6 9 9 6 6 6 6 6 6 9 9 6 . . 
        . 6 9 6 6 . . . . . . 6 6 9 6 . 
        6 9 6 . . . . . . . . . . 6 9 6 
        9 6 . . . . . . . . . . . . 6 9 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `],
    60,
    false
    )
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Math.percentChance(50)) {
        mySprite.setImage(spriteSheet[1])
    } else {
        mySprite.setImage(spriteSheet[2])
    }
    magicbeam = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, mySprite, 0, -100)
    spell()
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.EnemyProjectile, function (sprite, otherSprite) {
    if (controller.B.isPressed()) {
        projectile.vy = -100
        animation.runImageAnimation(
        projectile,
        [img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . . . 4 5 4 . . . . . . 
            . . . . . . 4 5 1 4 . . . . . . 
            . . . . . . 4 5 1 4 . . . . . . 
            . . . . . . . 4 5 . . . . . . . 
            . . . . . . . 4 5 . . . . . . . 
            . . . . . . . . 5 . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . . 4 5 4 . . . . . . . 
            . . . . . . 4 1 5 4 . . . . . . 
            . . . . . . 4 1 5 4 . . . . . . 
            . . . . . . . 5 4 . . . . . . . 
            . . . . . . . 5 4 . 4 . . . . . 
            . . . . . . . 5 . . 4 . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . . . 4 5 4 . . . . . . 
            . . . . . . 4 5 1 4 . . . . . . 
            . . . . . . 4 5 1 4 . . . . . . 
            . . . . . . . 4 5 . . . . . . . 
            . . . . . . . 4 5 . . . . . . . 
            . . . . . 4 . . 5 . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . . 4 5 4 . . . . . . . 
            . . . . . . 4 1 5 4 . . . . . . 
            . . . . . . 4 1 5 4 . . . . . . 
            . . . . . . . 5 4 . . . . . . . 
            . . . . . . . 5 4 . 4 . . . . . 
            . . . . . . . 5 . . . . . . . . 
            `],
        200,
        false
        )
        music.pewPew.play()
    } else {
        sprites.destroyAllSpritesOfKind(SpriteKind.Projectile, effects.spray, 200)
        sprites.destroyAllSpritesOfKind(SpriteKind.EnemyProjectile, effects.spray, 200)
    }
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Boss, function (sprite, otherSprite) {
    sprite.destroy()
    knockback3(otherSprite)
})
tiles.onMapLoaded(function (tilemap2) {
    if (tiles.getLoadedMap() != map1) {
        if (mySprite.x >= 50) {
            tiles.setTileAt(tiles.getTileLocation(4, 15), assets.tile`tile7`)
            tiles.setWallAt(tiles.getTileLocation(4, 15), true)
            alienSpeed += 5
            surprise()
            for (let value of tiles.getTilesByType(assets.tile`myTile`)) {
                createBoss()
            }
            for (let value of tiles.getTilesByType(assets.tile`myTile0`)) {
                createAlien()
            }
            tiles.setTileAt(tiles.getTileLocation(4, 15), assets.tile`tile28`)
            tiles.setWallAt(tiles.getTileLocation(4, 15), false)
            spawn = false
        }
    }
})
sprites.onDestroyed(SpriteKind.Boss, function (sprite) {
    sprites.destroyAllSpritesOfKind(SpriteKind.EnemyProjectile)
    bossActive = false
    spawn = false
    map1end()
})
function createMaps () {
    map1 = tiles.createMap(tilemap`level14`)
    map2 = tiles.createMap(tilemap`level35`)
    map3 = tiles.createMap(tilemap`level36`)
    map4 = tiles.createMap(tilemap`level29`)
    tilemaps = [
    map1,
    map2,
    map3,
    map4
    ]
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`tile3`, function (sprite, location) {
    if (mySprite.y <= 25) {
        if (level >= 3) {
            level = 0
            bossActive = true
        }
        bossActive = false
        level += 1
        levelCount += 1
        tiles.loadMap(tilemaps[level])
        mySprite.setPosition(72, 230)
    }
})
function knockback2 (value: Sprite) {
    music.sonar.stop()
    scene.cameraShake(3, 100)
    music.bigCrash.play()
    if (Math.percentChance(50)) {
        animation.runImageAnimation(
        value,
        [img`
            . . . . . f f f f f f . . . . . 
            . . . . f f 2 2 2 2 f f . . b . 
            . . . f f c 2 2 2 2 c f f b 1 . 
            . . . f 2 2 2 2 2 2 2 2 b 1 1 . 
            . . f 2 2 2 2 2 2 2 2 2 b 1 b . 
            . f 2 f c c c c c c c c b 1 b . 
            . f f 2 2 f c c c c f b 1 1 b . 
            . . f f f 2 f f f f b 1 1 b . . 
            . . f 2 f f f 2 2 f 1 b 2 f . . 
            . . f 2 f . f 2 f 1 1 b 2 f . . 
            . . . f 2 f b 1 1 1 . 2 f . . . 
            . . 2 f b b b 1 b b . 2 f 2 . . 
            . . f b 1 1 1 b f . . f 2 f . . 
            . . 1 1 1 b b 2 f . . . f . . . 
            . b b b b . f 2 2 f . . . . . . 
            . . . . . . . f f . . . . . . . 
            `,img`
            . . . . . f f f f f f . . . . . 
            . . . . f f 2 2 2 2 f f . . b . 
            . . . f f c 2 2 2 2 c f f b 1 . 
            . . . f 2 2 2 2 2 2 2 2 b 1 1 . 
            . . f 2 2 2 2 2 2 2 2 2 b 1 b . 
            . f 2 f c c c c c c c c b 1 b . 
            . f f 2 2 f c c c c f b 1 1 b . 
            . . f f f 2 f f f f b f f f . . 
            . . f 2 f f f 2 2 f f f 2 f . . 
            . . f 2 f . f 2 f . . f 2 f . . 
            . . . f 2 f b f 2 2 . 2 f . . . 
            . . 2 f b b b f 2 f . 2 f 2 . . 
            . . f b 1 1 f 2 f . . f 2 f . . 
            . . 1 1 1 b f 2 f . . . f . . . 
            . b b b b . f 2 2 f . . . . . . 
            . . . . . . . f f . . . . . . . 
            `,img`
            . . . . . f f f f f f . . . . . 
            . . . . f f 2 2 2 2 f f . . . . 
            . . . f f c 2 2 2 2 c f f . . . 
            . . . f 2 2 2 2 2 2 2 2 f . . . 
            . . f 2 2 2 2 2 2 2 2 2 2 f . . 
            . f 2 f c c c c c c c c f 2 f . 
            . f f 2 2 f c c c c f 2 2 f f . 
            . . f f f 2 f f f f 2 f f f . . 
            . . f 2 f f f 2 2 f f f 2 f . . 
            . . f 2 f . f 2 f . . f 2 f . . 
            . . . f 2 f . f 2 2 . 2 f . . . 
            . . 2 f 2 f . f 2 f . 2 f 2 . . 
            . . f 2 f . f 2 f . . f 2 f . . 
            . . . f . . f 2 f . . . f . . . 
            . . . . . . f 2 2 f . . . . . . 
            . . . . . . . f f . . . . . . . 
            `],
        100,
        false
        )
    } else {
        animation.runImageAnimation(
        value,
        [img`
            . . . . . f f f f f f . . . . . 
            . b . . f f 2 2 2 2 f f . . . . 
            . 1 b f f c 2 2 2 2 c f f . . . 
            . 1 1 b 2 2 2 2 2 2 2 2 f . . . 
            . b 1 b 2 2 2 2 2 2 2 2 2 f . . 
            . b 1 b c c c c c c c c f 2 f . 
            . b 1 1 b f c c c c f 2 2 f f . 
            . . b 1 1 b f f f f 2 f f f . . 
            . . f 2 b 1 f 2 2 f f f 2 f . . 
            . . f 2 b 1 1 f 2 f . f 2 f . . 
            . . . f 2 . 1 1 1 b f 2 f . . . 
            . . 2 f 2 . b b 1 b b b f 2 . . 
            . . f 2 f . . f b 1 1 1 b f . . 
            . . . f . . . f 2 b b 1 1 1 . . 
            . . . . . . f 2 2 f . b b b b . 
            . . . . . . . f f . . . . . . . 
            `,img`
            . . . . . f f f f f f . . . . . 
            . b . . f f 2 2 2 2 f f . . . . 
            . 1 b f f c 2 2 2 2 c f f . . . 
            . 1 1 b 2 2 2 2 2 2 2 2 f . . . 
            . b 1 b 2 2 2 2 2 2 2 2 2 f . . 
            . b 1 b c c c c c c c c f 2 f . 
            . b 1 1 b f c c c c f 2 2 f f . 
            . . f f f b f f f f 2 f f f . . 
            . . f 2 f f f 2 2 f f f 2 f . . 
            . . f 2 f . . f 2 f . f 2 f . . 
            . . . f 2 . 2 2 f b f 2 f . . . 
            . . 2 f 2 . f 2 f b b b f 2 . . 
            . . f 2 f . . f 2 f 1 1 b f . . 
            . . . f . . . f 2 f b 1 1 1 . . 
            . . . . . . f 2 2 f . b b b b . 
            . . . . . . . f f . . . . . . . 
            `,img`
            . . . . . f f f f f f . . . . . 
            . . . . f f 2 2 2 2 f f . . . . 
            . . . f f c 2 2 2 2 c f f . . . 
            . . . f 2 2 2 2 2 2 2 2 f . . . 
            . . f 2 2 2 2 2 2 2 2 2 2 f . . 
            . f 2 f c c c c c c c c f 2 f . 
            . f f 2 2 f c c c c f 2 2 f f . 
            . . f f f 2 f f f f 2 f f f . . 
            . . f 2 f f f 2 2 f f f 2 f . . 
            . . f 2 f . f 2 f . . f 2 f . . 
            . . . f 2 f . f 2 2 . 2 f . . . 
            . . 2 f 2 f . f 2 f . 2 f 2 . . 
            . . f 2 f . f 2 f . . f 2 f . . 
            . . . f . . f 2 f . . . f . . . 
            . . . . . . f 2 2 f . . . . . . 
            . . . . . . . f f . . . . . . . 
            `],
        100,
        false
        )
    }
    if (controller.B.isPressed() == false) {
        statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, value).value += -1
    }
}
statusbars.onZero(StatusBarKind.EnemyHealth, function (status) {
    music.sonar.stop()
    animation.runImageAnimation(
    status.spriteAttachedTo(),
    [img`
        . . . . . f f f f f f . . . . . 
        . . . . f f 2 2 2 2 f f . . . . 
        . . . f f c 2 2 2 2 c f f . . . 
        . . . f 2 2 2 2 2 2 2 2 f . . . 
        . . f 2 2 2 2 2 2 2 2 2 2 f . . 
        . f 2 f c c c c c c c c f 2 f . 
        . f f 2 2 f c c c c f 2 2 f f . 
        . . f f f 2 f f f f 2 f f f . . 
        . . f 2 f f f 2 2 f f f 2 f . . 
        . . f 2 f . f 2 f . . f 2 f . . 
        . . . f 2 f . f 2 2 . 2 f . . . 
        . . 2 f 2 f . f 2 f . 2 f 2 . . 
        . . f 2 f . f 2 f . . f 2 f . . 
        . . . f . . f 2 f . . . f . . . 
        . . . . . . f 2 2 f . . . . . . 
        . . . . . . . f f . . . . . . . 
        `,img`
        . . . . . f f f f f f . . . . . 
        . . . . f f 2 2 2 2 f f . . . . 
        . . . f f c 2 2 2 2 c f f . . . 
        . . . f 2 2 2 2 2 2 2 2 f . . . 
        . . f 2 2 2 2 b b 2 2 2 2 f . . 
        . f 2 f c c b d d b c c f 2 f . 
        . f f 2 2 b d 1 1 d b 2 2 f f . 
        . . f f f b d 1 1 d b f f f . . 
        . . f 2 f f b d d b f f 2 f . . 
        . . f 2 f . f b b . . f 2 f . . 
        . . . f 2 f . f 2 2 . 2 f . . . 
        . . 2 f 2 f . f 2 f . 2 f 2 . . 
        . . f 2 f . f 2 f . . f 2 f . . 
        . . . f . . f 2 f . . . f . . . 
        . . . . . . f 2 2 f . . . . . . 
        . . . . . . . f f . . . . . . . 
        `,img`
        . . . . . f f f f f f . . . . . 
        . . . . f f 2 2 2 2 f f . . . . 
        . . . f f c b b b b c f f . . . 
        . . . f 2 b b d d b b 2 f . . . 
        . . f 2 b d d 1 1 d d b 2 f . . 
        . f 2 b b d 1 1 1 1 d b b 2 f . 
        . f f b d 1 1 1 1 1 1 d b f f . 
        . . f b d 1 1 1 1 1 1 d b f . . 
        . . f b d 1 1 1 1 1 1 d b f . . 
        . . f 2 b d d 1 1 1 d b 2 f . . 
        . . . f 2 b b d d d b 2 f . . . 
        . . 2 f 2 f b b b b . 2 f 2 . . 
        . . f 2 f . f 2 f . . f 2 f . . 
        . . . f . . f 2 f . . . f . . . 
        . . . . . . f 2 2 f . . . . . . 
        . . . . . . . f f . . . . . . . 
        `,img`
        . . . . . f f f f f f . . . . . 
        . . . . f f b b b b f f . . . . 
        . . . f b b d d d b b f f . . . 
        . . . b d d 1 1 1 d d b f . . . 
        . . b d 1 1 1 1 1 1 1 d b f . . 
        . f b d 1 1 1 1 1 1 1 d b b f . 
        . f b d 1 1 1 1 1 1 1 1 d b f . 
        . . b d 1 1 1 1 1 1 1 1 d b . . 
        . . b b d 1 1 1 1 1 1 1 d b . . 
        . . f b d 1 1 1 1 1 1 1 b f . . 
        . . . f b d 1 1 1 d d d b . . . 
        . . 2 f 2 b d d d b b b f 2 . . 
        . . f 2 f . b b b b . f 2 f . . 
        . . . f . . f 2 f . . . f . . . 
        . . . . . . f 2 2 f . . . . . . 
        . . . . . . . f f . . . . . . . 
        `,img`
        . . . . . f f b b b b b . . . . 
        . . . . b b b d d d b b b . . . 
        . . b b b d d 1 1 1 d d b . . . 
        . . b b d 1 1 1 1 1 1 1 d b . . 
        . b b d 1 1 1 1 1 1 1 1 d b . . 
        . b d 1 1 1 1 1 1 1 1 1 1 d b . 
        . b d 1 1 1 1 1 1 1 1 1 1 d b . 
        . b d 1 1 1 1 1 1 1 1 1 1 d b . 
        . . b d 1 1 1 1 1 1 1 1 d b b . 
        . . b d 1 1 1 1 1 1 1 1 d b b . 
        . . b d d 1 1 1 1 1 d d b b . . 
        . . 2 b b d d d d d b b f 2 . . 
        . . f 2 b b b b b b b f 2 f . . 
        . . . f . b b b b . . . f . . . 
        . . . . . . f 2 2 f . . . . . . 
        . . . . . . . f f . . . . . . . 
        `,img`
        . . . . b b b b b b b b . . . . 
        . . b b d d d d d d b b b . . . 
        . b b d 1 1 1 1 1 1 d d b b . . 
        . b d 1 1 1 1 1 1 1 1 1 d b b . 
        b b d 1 1 1 1 1 1 1 1 1 1 d d b 
        b d 1 1 1 1 1 1 1 1 1 1 1 1 d b 
        b d 1 1 1 1 1 1 1 1 1 1 1 1 d b 
        b d 1 1 1 1 1 1 1 1 1 1 1 1 d b 
        b d 1 1 1 1 1 1 1 1 1 1 1 1 d b 
        b d 1 1 1 1 1 1 1 1 1 1 1 d b b 
        b d 1 1 1 1 1 1 1 1 1 1 1 d b b 
        b b d 1 1 1 1 1 1 1 1 1 d b b b 
        b b b d d d 1 1 1 1 1 1 d b b . 
        . b b b b b d d d d d d b b b . 
        . . . b b b b b b b b b b . . . 
        . . . . b b b b b . . . . . . . 
        `,img`
        . . . . . . . b b b b b . . . . 
        . . . . b b b d d d b b b . . . 
        . . b b b d d 1 1 1 d d b . . . 
        . . b b d 1 1 1 1 1 1 1 d b . . 
        . b b d 1 1 1 1 1 1 1 1 d b . . 
        . b d 1 1 1 1 1 1 1 1 1 1 d b . 
        . b d 1 1 1 1 1 1 1 1 1 1 d b . 
        . b d 1 1 1 1 1 1 1 1 1 1 d b . 
        . . b d 1 1 1 1 1 1 1 1 d b b . 
        . . b d 1 1 1 1 1 1 1 1 d b b . 
        . . b d d 1 1 1 1 1 d d b b . . 
        . . . b b d d d d d b b . . . . 
        . . . . b b b b b b b . . . . . 
        . . . . . b b b b . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . b b b b . . . . . . 
        . . . . b b d d d b b . . . . . 
        . . . b d d 1 1 1 d d b . . . . 
        . . b d 1 1 1 1 1 1 1 d b . . . 
        . . b d 1 1 1 1 1 1 1 d b b . . 
        . . b d 1 1 1 1 1 1 1 1 d b . . 
        . . b d 1 1 1 1 1 1 1 1 d b . . 
        . . b b d 1 1 1 1 1 1 1 d b . . 
        . . . b d 1 1 1 1 1 1 d b . . . 
        . . . . b d 1 1 1 d d d b . . . 
        . . . . . b d d d b b b . . . . 
        . . . . . . b b b b . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . b b b b . . . . . . 
        . . . . . b b d d b b . . . . . 
        . . . . b d d 1 1 d d b . . . . 
        . . . b b d 1 1 1 1 d b b . . . 
        . . . b d 1 1 1 1 1 1 d b . . . 
        . . . b d 1 1 1 1 1 1 d b . . . 
        . . . b d 1 1 1 1 1 1 d b . . . 
        . . . . b d d 1 1 1 d b . . . . 
        . . . . . b b d d d b . . . . . 
        . . . . . . b b b b . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . b b . . . . . . . 
        . . . . . . b d d b . . . . . . 
        . . . . . b d 1 1 d b . . . . . 
        . . . . . b d 1 1 d b . . . . . 
        . . . . . . b d d b . . . . . . 
        . . . . . . . b b . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `],
    150,
    false
    )
    pause(500)
    alienCount += -1
    status.spriteAttachedTo().destroy()
    info.changeScoreBy(1)
    music.sonar.stop()
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Projectile, function (sprite, otherSprite) {
    sprites.destroyAllSpritesOfKind(SpriteKind.Projectile, effects.spray, 200)
})
function shieldup () {
    music.smallCrash.play()
    animation.runImageAnimation(
    magicshield,
    [img`
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        `,img`
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        ..5..............5..
        ..45............54..
        ...45..........54...
        ....................
        `,img`
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        .45..............54.
        .45..............54.
        .45..............54.
        .45..............54.
        ..5..............5..
        ..45............54..
        ...45..........54...
        ....................
        `,img`
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        ..5..............5..
        .45..............54.
        .45..............54.
        .45..............54.
        .45..............54.
        .45..............54.
        .45..............54.
        .45..............54.
        .45..............54.
        ..5..............5..
        ..45............54..
        ...45..........54...
        ....................
        `,img`
        ....................
        ....................
        ....................
        ...455........554...
        ...45..........54...
        ...45..........54...
        ..45............54..
        ..5..............5..
        .45..............54.
        .45..............54.
        .45..............54.
        .45..............54.
        .45..............54.
        .45..............54.
        .45..............54.
        .45..............54.
        ..5..............5..
        ..45............54..
        ...45..........54...
        ....................
        `,img`
        ........4444........
        .......455554.......
        ....4455....5544....
        ...455........554...
        ...45..........54...
        ...45..........54...
        ..45............54..
        ..5..............5..
        .45..............54.
        .45..............54.
        .45..............54.
        .45..............54.
        .45..............54.
        .45..............54.
        .45..............54.
        .45..............54.
        ..5..............5..
        ..45............54..
        ...45..........54...
        ....................
        `],
    60,
    false
    )
    magicshield.follow(mySprite)
}
function teleportStart () {
    animation.runImageAnimation(
    mySprite,
    [img`
        . . . . . . 8 8 . . . . . . . . 
        . . . . . 8 8 8 8 6 f . . . . . 
        . . . f 6 8 8 8 8 8 6 f f . . . 
        . . f 8 6 8 8 8 8 8 6 f 8 f . . 
        . f 8 8 f 6 6 5 6 6 f 8 8 f . . 
        . f 8 8 8 f f f f f 8 8 8 f . . 
        . . f 8 8 8 8 8 8 8 8 8 f f . . 
        . f f f 8 8 8 8 8 8 8 f e f f . 
        . f e e f f f f f f f e e e f . 
        . . f e e e e e e e e e e f . . 
        . . . f e e e e e e e e f . . . 
        . . f 8 f f f f f f f f 8 f . . 
        . f 8 8 f 8 8 8 8 8 8 f 8 8 f . 
        . . d 8 f 8 8 8 8 8 8 f 8 d . . 
        . . . f 6 f 8 8 8 8 f 6 f . . . 
        . . . . f f f f f f f f . . . . 
        `,img`
        . . . . . . 8 8 . . . . . . . . 
        . . . . . 8 8 8 8 6 f . . . . . 
        . . . f 6 8 8 8 8 8 6 f f . . . 
        . . f 8 6 8 8 8 8 8 6 f 8 f . . 
        . f 8 8 f 6 6 5 6 6 f 8 8 f . . 
        . f 8 8 8 f f f f f 8 8 8 f . . 
        . . f 8 8 8 8 8 8 8 8 8 f f . . 
        . f f f 8 8 8 7 8 8 8 f e f f . 
        . f e e f f 7 1 7 f f e e e f . 
        . . f e e e e 7 e e e e e f . . 
        . . . f e e e e e e e e f . . . 
        . . f 8 f f f f f f f f 8 f . . 
        . f 8 8 f 8 8 8 8 8 8 f 8 8 f . 
        . . d 8 f 8 8 8 8 8 8 f 8 d . . 
        . . . f 6 f 8 8 8 8 f 6 f . . . 
        . . . . f f f f f f f f . . . . 
        `,img`
        . . . . . . 8 8 . . . . . . . . 
        . . . . . 8 8 8 8 6 f . . . . . 
        . . . f 6 8 8 8 8 8 6 f f . . . 
        . . f 8 6 8 8 8 8 8 6 f 8 f . . 
        . f 8 8 f 6 6 5 6 6 f 8 8 f . . 
        . f 8 8 8 f f f f f 8 8 8 f . . 
        . . f 8 8 8 7 7 7 8 8 8 f f . . 
        . f f f 8 7 1 1 1 7 8 f e f f . 
        . f e e f 7 7 1 1 7 f e e e f . 
        . . f e e 7 1 1 7 7 e e e f . . 
        . . . f e e 7 7 e e e e f . . . 
        . . f 8 f f f f f f f f 8 f . . 
        . f 8 8 f 8 8 8 8 8 8 f 8 8 f . 
        . . d 8 f 8 8 8 8 8 8 f 8 d . . 
        . . . f 6 f 8 8 8 8 f 6 f . . . 
        . . . . f f f f f f f f . . . . 
        `,img`
        . . . . . . 8 8 . . . . . . . . 
        . . . . . 8 8 8 8 6 f . . . . . 
        . . . f 6 8 8 8 8 8 6 f f . . . 
        . . f 8 6 8 8 8 8 8 6 f 8 f . . 
        . f 8 8 f 6 6 7 7 6 f 8 8 f . . 
        . f 8 8 8 f 7 1 1 7 8 8 8 f . . 
        . . f 8 7 7 1 1 1 7 8 8 f f . . 
        . f f 7 1 7 7 1 1 1 7 f e f f . 
        . f e 7 1 1 1 1 1 1 1 7 e e f . 
        . . f e 7 1 1 1 1 7 1 7 e f . . 
        . . . f e 7 1 7 1 7 7 e f . . . 
        . . f 8 f 7 1 7 7 f f f 8 f . . 
        . f 8 8 f 8 7 7 8 8 8 f 8 8 f . 
        . . d 8 f 8 8 8 8 8 8 f 8 d . . 
        . . . f 6 f 8 8 8 8 f 6 f . . . 
        . . . . f f f f f f f f . . . . 
        `,img`
        . . . . . . 8 8 . . . . . . . . 
        . . . . . 8 8 8 8 6 f . . . . . 
        . . . f 6 8 8 8 8 8 6 f f . . . 
        . . f 8 6 8 8 8 7 8 6 f 8 f . . 
        . f 8 8 f 6 6 7 1 7 f 8 8 f . . 
        . f 8 8 8 f 7 1 1 7 8 8 8 f . . 
        . . f 7 7 7 1 1 1 7 8 8 f f . . 
        . f 7 1 1 7 7 1 1 1 7 f e f f . 
        . f e 7 1 1 1 1 1 1 1 7 e e f . 
        . . f e 7 1 1 1 1 7 1 1 7 f . . 
        . . . f e 7 7 1 1 7 7 7 f . . . 
        . . f 8 f 7 1 1 7 f f f 8 f . . 
        . f 8 8 f 7 1 7 8 8 8 f 8 8 f . 
        . . d 8 f 8 7 8 8 8 8 f 8 d . . 
        . . . f 6 f 8 8 8 8 f 6 f . . . 
        . . . . f f f f f f f f . . . . 
        `,img`
        . . . . . . 8 8 . . . . . . . . 
        . . . . . 8 8 8 8 6 f . . . . . 
        . . . f 6 8 8 8 8 8 6 f f . . . 
        . . f 8 6 8 8 8 7 8 7 f 8 f . . 
        . f 8 8 f 6 6 7 1 7 1 7 8 f . . 
        . f 8 8 7 7 7 1 1 1 7 8 8 f . . 
        . . f 7 1 7 1 1 1 7 7 8 f f . . 
        . 7 7 1 1 1 1 1 1 1 7 f e f f . 
        . 7 1 1 1 1 1 1 1 1 1 7 7 e f . 
        . 7 7 7 1 1 1 1 1 1 1 1 1 7 . . 
        . . . f 7 7 1 1 1 1 7 1 7 . . . 
        . . f 8 7 1 1 1 1 7 7 7 8 f . . 
        . f 8 8 f 7 1 1 1 7 8 f 8 8 f . 
        . . d 8 f 7 7 7 7 8 8 f 8 d . . 
        . . . f 6 f 8 7 8 8 f 6 f . . . 
        . . . . f f f f f f f f . . . . 
        `,img`
        . . . . . . 8 8 . . . . . . . . 
        . . . . . 8 8 8 8 6 f . . . . . 
        . . . f 6 8 8 8 8 8 6 f f . . . 
        . . f 8 6 8 8 8 7 8 7 f 8 f . . 
        . f 8 8 f 7 7 7 1 7 1 7 8 f . . 
        . f 8 8 7 1 1 1 1 1 1 7 8 f . . 
        . . f 7 1 1 1 1 1 1 1 1 7 f . . 
        . 7 7 1 1 1 1 1 1 1 1 1 7 f f . 
        . 7 1 1 1 1 1 1 1 1 1 1 1 7 f . 
        . . 7 1 1 1 1 1 1 1 1 1 1 7 . . 
        . . . 7 1 1 1 1 1 1 1 1 1 7 . . 
        . . f 7 1 1 1 1 1 1 1 7 7 f . . 
        . f 8 8 7 7 1 1 1 7 7 f 8 8 f . 
        . . d 8 f 7 7 7 7 8 8 f 8 d . . 
        . . . f 6 f 8 7 8 8 f 6 f . . . 
        . . . . f f f f f f f f . . . . 
        `,img`
        . . . . 7 . 8 8 . . . . . . . . 
        . . . 7 1 7 8 8 8 6 f . . . . . 
        . . . f 7 8 8 8 8 8 6 f f . . . 
        . . f 8 6 8 8 8 7 8 7 f 8 f . . 
        . f 8 8 f 7 7 7 1 7 1 7 8 f . 7 
        . f 8 8 7 1 1 1 1 1 1 7 8 f . . 
        . . f 7 1 1 1 1 1 1 1 1 7 f . . 
        . 7 7 1 1 1 1 1 1 1 1 1 7 f f . 
        . 7 1 1 1 1 1 1 1 1 1 1 1 7 f . 
        . . 7 1 1 1 1 1 1 1 1 1 1 7 . . 
        7 . . 7 1 1 1 1 1 1 1 1 1 7 . . 
        . . f 7 1 1 1 1 1 1 1 7 7 f . . 
        . f 8 8 7 7 1 1 1 7 7 f 8 8 f . 
        . . d 8 f 7 7 7 7 8 8 f 8 d 7 . 
        . . . f 6 f 8 7 8 8 f 6 f 7 1 7 
        . . . . f f f f f f f f . . 7 . 
        `,img`
        . . . . 7 . . . . . . . . . . . 
        . . . 7 1 7 . . . . . . . . . . 
        . . . . 7 . . . . . . . . . . . 
        . . . . . . . . 7 . 7 . . . . . 
        . . . . . 7 7 7 1 7 1 7 . . . 7 
        . . . . 7 1 1 1 1 1 1 7 . . . . 
        . . . 7 1 1 1 1 1 1 1 1 7 . . . 
        . 7 7 1 1 1 1 1 1 1 1 1 7 . . . 
        . 7 1 1 1 1 1 1 1 1 1 1 1 7 . . 
        . . 7 1 1 1 1 1 1 1 1 1 1 7 . . 
        7 . . 7 1 1 1 1 1 1 1 1 1 7 . . 
        . . . 7 1 1 1 1 1 1 1 7 7 . . . 
        . . . . 7 7 1 1 1 7 7 . . . . . 
        . . . . . 7 7 7 7 . . . . . 7 . 
        . . . . . . . 7 . . . . . 7 1 7 
        . . . . . . . . . . . . . . 7 . 
        `],
    60,
    false
    )
}
controller.A.onEvent(ControllerButtonEvent.Released, function () {
    pause(1000)
    mySprite.setImage(spriteSheet[0])
})
function teleportEnd () {
    animation.runImageAnimation(
    mySprite,
    [img`
        . . . . 7 . . . . . . . . . . . 
        . . . 7 1 7 . . . . . . . . . . 
        . . . . 7 . . . . . . . . . . . 
        . . . . . . . . 7 . 7 . . . . . 
        . . . . . 7 7 7 1 7 1 7 . . . 7 
        . . . . 7 1 1 1 1 1 1 7 . . . . 
        . . . 7 1 1 1 1 1 1 1 1 7 . . . 
        . 7 7 1 1 1 1 1 1 1 1 1 7 . . . 
        . 7 1 1 1 1 1 1 1 1 1 1 1 7 . . 
        . . 7 1 1 1 1 1 1 1 1 1 1 7 . . 
        7 . . 7 1 1 1 1 1 1 1 1 1 7 . . 
        . . . 7 1 1 1 1 1 1 1 7 7 . . . 
        . . . . 7 7 1 1 1 7 7 . . . . . 
        . . . . . 7 7 7 7 . . . . . 7 . 
        . . . . . . . 7 . . . . . 7 1 7 
        . . . . . . . . . . . . . . 7 . 
        `,img`
        . . . . 7 . 8 8 . . . . . . . . 
        . . . 7 1 7 8 8 8 6 f . . . . . 
        . . . f 7 8 8 8 8 8 6 f f . . . 
        . . f 8 6 8 8 8 7 8 7 f 8 f . . 
        . f 8 8 f 7 7 7 1 7 1 7 8 f . 7 
        . f 8 8 7 1 1 1 1 1 1 7 8 f . . 
        . . f 7 1 1 1 1 1 1 1 1 7 f . . 
        . 7 7 1 1 1 1 1 1 1 1 1 7 f f . 
        . 7 1 1 1 1 1 1 1 1 1 1 1 7 f . 
        . . 7 1 1 1 1 1 1 1 1 1 1 7 . . 
        7 . . 7 1 1 1 1 1 1 1 1 1 7 . . 
        . . f 7 1 1 1 1 1 1 1 7 7 f . . 
        . f 8 8 7 7 1 1 1 7 7 f 8 8 f . 
        . . d 8 f 7 7 7 7 8 8 f 8 d 7 . 
        . . . f 6 f 8 7 8 8 f 6 f 7 1 7 
        . . . . f f f f f f f f . . 7 . 
        `,img`
        . . . . . . 8 8 . . . . . . . . 
        . . . . . 8 8 8 8 6 f . . . . . 
        . . . f 6 8 8 8 8 8 6 f f . . . 
        . . f 8 6 8 8 8 7 8 7 f 8 f . . 
        . f 8 8 f 7 7 7 1 7 1 7 8 f . . 
        . f 8 8 7 1 1 1 1 1 1 7 8 f . . 
        . . f 7 1 1 1 1 1 1 1 1 7 f . . 
        . 7 7 1 1 1 1 1 1 1 1 1 7 f f . 
        . 7 1 1 1 1 1 1 1 1 1 1 1 7 f . 
        . . 7 1 1 1 1 1 1 1 1 1 1 7 . . 
        . . . 7 1 1 1 1 1 1 1 1 1 7 . . 
        . . f 7 1 1 1 1 1 1 1 7 7 f . . 
        . f 8 8 7 7 1 1 1 7 7 f 8 8 f . 
        . . d 8 f 7 7 7 7 8 8 f 8 d . . 
        . . . f 6 f 8 7 8 8 f 6 f . . . 
        . . . . f f f f f f f f . . . . 
        `,img`
        . . . . . . 8 8 . . . . . . . . 
        . . . . . 8 8 8 8 6 f . . . . . 
        . . . f 6 8 8 8 8 8 6 f f . . . 
        . . f 8 6 8 8 8 7 8 7 f 8 f . . 
        . f 8 8 f 6 6 7 1 7 1 7 8 f . . 
        . f 8 8 7 7 7 1 1 1 7 8 8 f . . 
        . . f 7 1 7 1 1 1 7 7 8 f f . . 
        . 7 7 1 1 1 1 1 1 1 7 f e f f . 
        . 7 1 1 1 1 1 1 1 1 1 7 7 e f . 
        . 7 7 7 1 1 1 1 1 1 1 1 1 7 . . 
        . . . f 7 7 1 1 1 1 7 1 7 . . . 
        . . f 8 7 1 1 1 1 7 7 7 8 f . . 
        . f 8 8 f 7 1 1 1 7 8 f 8 8 f . 
        . . d 8 f 7 7 7 7 8 8 f 8 d . . 
        . . . f 6 f 8 7 8 8 f 6 f . . . 
        . . . . f f f f f f f f . . . . 
        `,img`
        . . . . . . 8 8 . . . . . . . . 
        . . . . . 8 8 8 8 6 f . . . . . 
        . . . f 6 8 8 8 8 8 6 f f . . . 
        . . f 8 6 8 8 8 7 8 6 f 8 f . . 
        . f 8 8 f 6 6 7 1 7 f 8 8 f . . 
        . f 8 8 8 f 7 1 1 7 8 8 8 f . . 
        . . f 7 7 7 1 1 1 7 8 8 f f . . 
        . f 7 1 1 7 7 1 1 1 7 f e f f . 
        . f e 7 1 1 1 1 1 1 1 7 e e f . 
        . . f e 7 1 1 1 1 7 1 1 7 f . . 
        . . . f e 7 7 1 1 7 7 7 f . . . 
        . . f 8 f 7 1 1 7 f f f 8 f . . 
        . f 8 8 f 7 1 7 8 8 8 f 8 8 f . 
        . . d 8 f 8 7 8 8 8 8 f 8 d . . 
        . . . f 6 f 8 8 8 8 f 6 f . . . 
        . . . . f f f f f f f f . . . . 
        `,img`
        . . . . . . 8 8 . . . . . . . . 
        . . . . . 8 8 8 8 6 f . . . . . 
        . . . f 6 8 8 8 8 8 6 f f . . . 
        . . f 8 6 8 8 8 8 8 6 f 8 f . . 
        . f 8 8 f 6 6 7 7 6 f 8 8 f . . 
        . f 8 8 8 f 7 1 1 7 8 8 8 f . . 
        . . f 8 7 7 1 1 1 7 8 8 f f . . 
        . f f 7 1 7 7 1 1 1 7 f e f f . 
        . f e 7 1 1 1 1 1 1 1 7 e e f . 
        . . f e 7 1 1 1 1 7 1 7 e f . . 
        . . . f e 7 1 7 1 7 7 e f . . . 
        . . f 8 f 7 1 7 7 f f f 8 f . . 
        . f 8 8 f 8 7 7 8 8 8 f 8 8 f . 
        . . d 8 f 8 8 8 8 8 8 f 8 d . . 
        . . . f 6 f 8 8 8 8 f 6 f . . . 
        . . . . f f f f f f f f . . . . 
        `,img`
        . . . . . . 8 8 . . . . . . . . 
        . . . . . 8 8 8 8 6 f . . . . . 
        . . . f 6 8 8 8 8 8 6 f f . . . 
        . . f 8 6 8 8 8 8 8 6 f 8 f . . 
        . f 8 8 f 6 6 5 6 6 f 8 8 f . . 
        . f 8 8 8 f f f f f 8 8 8 f . . 
        . . f 8 8 8 7 7 7 8 8 8 f f . . 
        . f f f 8 7 1 1 1 7 8 f e f f . 
        . f e e f 7 7 1 1 7 f e e e f . 
        . . f e e 7 1 1 7 7 e e e f . . 
        . . . f e e 7 7 e e e e f . . . 
        . . f 8 f f f f f f f f 8 f . . 
        . f 8 8 f 8 8 8 8 8 8 f 8 8 f . 
        . . d 8 f 8 8 8 8 8 8 f 8 d . . 
        . . . f 6 f 8 8 8 8 f 6 f . . . 
        . . . . f f f f f f f f . . . . 
        `,img`
        . . . . . . 8 8 . . . . . . . . 
        . . . . . 8 8 8 8 6 f . . . . . 
        . . . f 6 8 8 8 8 8 6 f f . . . 
        . . f 8 6 8 8 8 8 8 6 f 8 f . . 
        . f 8 8 f 6 6 5 6 6 f 8 8 f . . 
        . f 8 8 8 f f f f f 8 8 8 f . . 
        . . f 8 8 8 8 8 8 8 8 8 f f . . 
        . f f f 8 8 8 7 8 8 8 f e f f . 
        . f e e f f 7 1 7 f f e e e f . 
        . . f e e e e 7 e e e e e f . . 
        . . . f e e e e e e e e f . . . 
        . . f 8 f f f f f f f f 8 f . . 
        . f 8 8 f 8 8 8 8 8 8 f 8 8 f . 
        . . d 8 f 8 8 8 8 8 8 f 8 d . . 
        . . . f 6 f 8 8 8 8 f 6 f . . . 
        . . . . f f f f f f f f . . . . 
        `,img`
        . . . . . . 8 8 . . . . . . . . 
        . . . . . 8 8 8 8 6 f . . . . . 
        . . . f 6 8 8 8 8 8 6 f f . . . 
        . . f 8 6 8 8 8 8 8 6 f 8 f . . 
        . f 8 8 f 6 6 5 6 6 f 8 8 f . . 
        . f 8 8 8 f f f f f 8 8 8 f . . 
        . . f 8 8 8 8 8 8 8 8 8 f f . . 
        . f f f 8 8 8 8 8 8 8 f e f f . 
        . f e e f f f f f f f e e e f . 
        . . f e e e e e e e e e e f . . 
        . . . f e e e e e e e e f . . . 
        . . f 8 f f f f f f f f 8 f . . 
        . f 8 8 f 8 8 8 8 8 8 f 8 8 f . 
        . . d 8 f 8 8 8 8 8 8 f 8 d . . 
        . . . f 6 f 8 8 8 8 f 6 f . . . 
        . . . . f f f f f f f f . . . . 
        `],
    60,
    false
    )
}
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Player, function (sprite, otherSprite) {
    if (controller.B.isPressed()) {
        knockback2(sprite)
    } else {
        info.changeLifeBy(-1)
        scene.cameraShake(4, 500)
        mySprite.setPosition(mySprite.x, mySprite.y + 20)
        mySprite.setImage(spriteSheet[4])
        pause(100)
        mySprite.setImage(spriteSheet[0])
    }
})
function shielddown () {
    animation.runImageAnimation(
    magicshield,
    [img`
        ........4444........
        .......455554.......
        ....4455....5544....
        ...455........554...
        ...45..........54...
        ...45..........54...
        ..45............54..
        ..5..............5..
        .45..............54.
        .45..............54.
        .45..............54.
        .45..............54.
        .45..............54.
        .45..............54.
        .45..............54.
        .45..............54.
        ..5..............5..
        ..45............54..
        ...45..........54...
        ....................
        `,img`
        ....................
        ....................
        ....................
        ...455........554...
        ...45..........54...
        ...45..........54...
        ..45............54..
        ..5..............5..
        .45..............54.
        .45..............54.
        .45..............54.
        .45..............54.
        .45..............54.
        .45..............54.
        .45..............54.
        .45..............54.
        ..5..............5..
        ..45............54..
        ...45..........54...
        ....................
        `,img`
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        ..5..............5..
        .45..............54.
        .45..............54.
        .45..............54.
        .45..............54.
        .45..............54.
        .45..............54.
        .45..............54.
        .45..............54.
        ..5..............5..
        ..45............54..
        ...45..........54...
        ....................
        `,img`
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        .45..............54.
        .45..............54.
        .45..............54.
        .45..............54.
        ..5..............5..
        ..45............54..
        ...45..........54...
        ....................
        `,img`
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        ..5..............5..
        ..45............54..
        ...45..........54...
        ....................
        `,img`
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        `],
    60,
    false
    )
    magicshield.follow(mySprite)
}
info.onLifeZero(function () {
    music.stopAllSounds()
    game.over(false)
})
function surprise () {
    mySprite.sayText("!", 500, true)
    music.knock.play()
    pause(1000)
}
controller.B.onEvent(ControllerButtonEvent.Released, function () {
    magicshield.follow(mySprite)
    shielddown()
    alien.vy += -30
    pause(1000)
    alien.vy += 30
    pause(1000)
    mySprite.setImage(spriteSheet[0])
})
function createPlayer () {
    mySprite = sprites.create(img`
        . . . . . . 8 8 . . . . . . . . 
        . . . . . 8 8 8 8 6 f . . . . . 
        . . . f 6 8 8 8 8 8 6 f f . . . 
        . . f 8 6 8 8 8 8 8 6 f 8 f . . 
        . f 8 8 f 6 6 5 6 6 f 8 8 f . . 
        . f 8 8 8 f f f f f 8 8 8 f . . 
        . . f 8 8 8 8 8 8 8 8 8 f f . . 
        . f f f 8 8 8 8 8 8 8 f e f f . 
        . f e e f f f f f f f e e e f . 
        . . f e e e e e e e e e e f . . 
        . . . f e e e e e e e e f . . . 
        . . f 8 f f f f f f f f 8 f . . 
        . f 8 8 f 8 8 8 8 8 8 f 8 8 f . 
        . . d 8 f 8 8 8 8 8 8 f 8 d . . 
        . . . f 6 f 8 8 8 8 f 6 f . . . 
        . . . . f f f f f f f f . . . . 
        `, SpriteKind.Player)
    spriteSheet = [
    img`
        . . . . . . 8 8 . . . . . . . . 
        . . . . . 8 8 8 8 6 f . . . . . 
        . . . f 6 8 8 8 8 8 6 f f . . . 
        . . f 8 6 8 8 8 8 8 6 f 8 f . . 
        . f 8 8 f 6 6 5 6 6 f 8 8 f . . 
        . f 8 8 8 f f f f f 8 8 8 f . . 
        . . f 8 8 8 8 8 8 8 8 8 f f . . 
        . f f f 8 8 8 8 8 8 8 f e f f . 
        . f e e f f f f f f f e e e f . 
        . . f e e e e e e e e e e f . . 
        . . . f e e e e e e e e f . . . 
        . . f 8 f f f f f f f f 8 f . . 
        . f 8 8 f 8 8 8 8 8 8 f 8 8 f . 
        . . d 8 f 8 8 8 8 8 8 f 8 d . . 
        . . . f 6 f 8 8 8 8 f 6 f . . . 
        . . . . f f f f f f f f . . . . 
        `,
    img`
        . . . . . . 8 8 . . . . . . . . 
        . . . . . 8 8 8 8 6 f . . . . . 
        . . . f 6 8 8 8 8 8 6 f f . . . 
        . . f 8 6 8 8 8 8 8 6 f 8 f . . 
        . f 8 8 f 6 6 5 6 6 f 8 8 f . . 
        . f 8 8 8 f f f f f 8 8 8 f . . 
        . . f 8 8 8 8 8 8 8 8 8 f f . . 
        . f f f 8 8 8 8 8 8 8 f e f f . 
        . f e e f f f f f f f e e e f . 
        . . f e e e e e e e e e e f . . 
        . . . f e e e e e e e e f . . . 
        . . f 8 f f f f f f f f 8 d . . 
        . f 8 8 f 8 8 8 8 8 8 f 8 8 f . 
        . . d 8 f 8 8 8 8 8 8 f 8 f . . 
        . . . f 6 f 8 8 8 8 f 6 f . . . 
        . . . . f f f f f f f f . . . . 
        `,
    img`
        . . . . . . 8 8 . . . . . . . . 
        . . . . . 8 8 8 8 6 f . . . . . 
        . . . f 6 8 8 8 8 8 6 f f . . . 
        . . f 8 6 8 8 8 8 8 6 f 8 f . . 
        . f 8 8 f 6 6 5 6 6 f 8 8 f . . 
        . f 8 8 8 f f f f f 8 8 8 f . . 
        . . f 8 8 8 8 8 8 8 8 8 f f . . 
        . f f f 8 8 8 8 8 8 8 f e f f . 
        . f e e f f f f f f f e e e f . 
        . . f e e e e e e e e e e f . . 
        . . . f e e e e e e e e f . . . 
        . . d 8 f f f f f f f f 8 f . . 
        . f 8 8 f 8 8 8 8 8 8 f 8 8 f . 
        . . f 8 f 8 8 8 8 8 8 f 8 d . . 
        . . . f 6 f 8 8 8 8 f 6 f . . . 
        . . . . f f f f f f f f . . . . 
        `,
    img`
        . . . . . . 8 8 . . . . . . . . 
        . . . . . 8 8 8 8 6 f . . . . . 
        . . . f 6 8 8 8 8 8 6 f f . . . 
        . . f 8 6 8 8 8 8 8 6 f 8 f . . 
        . f 8 8 f 6 6 5 6 6 f 8 8 f . . 
        . f 8 8 8 f f f f f 8 8 8 f . . 
        . . f 8 8 8 8 8 8 8 8 8 f f . . 
        . f f f 8 8 8 8 8 8 8 f e f f . 
        . f e e f f f f f f f e e e f . 
        . . f e e e e e e e e e e f . . 
        . . . f e e e e e e e e f . . . 
        . . d 8 f f f f f f f f 8 d . . 
        . f 8 8 f 8 8 8 8 8 8 f 8 8 f . 
        . . f 8 f 8 8 8 8 8 8 f 8 f . . 
        . . . f 6 f 8 8 8 8 f 6 f . . . 
        . . . . f f f f f f f f . . . . 
        `,
    img`
        . . . . . . 2 2 . . . . . . . . 
        . . . . . 2 2 2 2 3 d . . . . . 
        . . . d 3 2 2 2 2 2 3 d d . . . 
        . . d 2 3 2 2 2 2 2 3 d 3 d . . 
        . d 3 2 d 3 3 1 3 3 d 2 3 d . . 
        . d 3 2 2 d d d d d 2 2 3 d . . 
        . . d 3 2 2 2 2 2 2 2 3 d d . . 
        . d d d 3 3 3 3 3 3 3 d 2 d d . 
        . d 3 2 d d d d d d d 2 2 3 d . 
        . . d 3 2 2 2 2 2 2 2 2 3 d . . 
        . . . d 3 3 3 3 3 3 3 3 d . . . 
        . . d 2 d d d d d d d d 2 d . . 
        . d 2 2 d 2 2 2 2 2 2 d 2 2 d . 
        . . 3 2 d 3 2 2 2 2 3 d 2 3 . . 
        . . . d 3 d 3 3 3 3 d 3 d . . . 
        . . . . d d d d d d d d . . . . 
        `
    ]
    scene.cameraFollowSprite(mySprite)
    controller.moveSprite(mySprite, 100, 100)
    mySprite.setStayInScreen(true)
    mySprite.setBounceOnWall(true)
}
function createAlien () {
    if (bossActive == false) {
        if (spawn == true) {
            alienCount += 1
            alien = sprites.create(img`
                . . . . . f f f f f f . . . . . 
                . . . . f f 2 2 2 2 f f . . . . 
                . . . f f c f f f f c f f . . . 
                . . . f 2 f 4 4 4 4 f 2 f . . . 
                . . f 2 f f 4 f f 4 f f 2 f . . 
                . f 2 f c f 4 f f 4 f c f 2 f . 
                . f f 2 2 f 4 4 4 4 f 2 2 f f . 
                . . f f f 2 f f f f 2 f f f . . 
                . . f 2 f f f 2 2 f f f 2 f . . 
                . . f 2 f . f 2 f . . f 2 f . . 
                . . . f 2 f . f 2 2 . 2 f . . . 
                . . 2 f 2 f . f 2 f . 2 f 2 . . 
                . . f 2 f . f 2 f . . f 2 f . . 
                . . . f . . f 2 f . . . f . . . 
                . . . . . . f 2 2 f . . . . . . 
                . . . . . . . f f . . . . . . . 
                `, SpriteKind.Enemy)
            alienHP = statusbars.create(16, 4, StatusBarKind.EnemyHealth)
            alienHP.setBarBorder(1, 13)
            alienHP.setColor(2, 11)
            alienHP.attachToSprite(alien, 3, 0)
            alienHP.max = 5
            alien.setBounceOnWall(true)
            music.sonar.loop()
            for (let value of tiles.getTilesByType(assets.tile`myTile0`)) {
                tiles.placeOnTile(alien, value)
            }
            if (Math.percentChance(50)) {
                alien.setVelocity(30, alienSpeed)
            } else {
                alien.setVelocity(-30, alienSpeed)
            }
        }
    }
}
sprites.onDestroyed(SpriteKind.Enemy, function (sprite) {
    if (alienCount == 0) {
        map1end()
    }
})
function textsprite2 () {
    textSprite = message
    textSprite.setPosition(82, 210)
    pause(1000)
    textSprite.destroy()
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.destroy()
    knockback2(otherSprite)
    otherSprite.vy += -20
    pause(1000)
    otherSprite.vy += 20
})
sprites.onOverlap(SpriteKind.EnemyProjectile, SpriteKind.Boss, function (sprite, otherSprite) {
    sprite.destroy()
    knockback3(otherSprite)
    bossHP.value += -4
})
let textSprite: TextSprite = null
let alienHP: StatusBarSprite = null
let map4: tiles.WorldMap = null
let map3: tiles.WorldMap = null
let map1: tiles.WorldMap = null
let magicbeam: Sprite = null
let magicshield: Sprite = null
let spriteSheet: Image[] = []
let alien: Sprite = null
let map2: tiles.WorldMap = null
let projectile: Sprite = null
let bossHP: StatusBarSprite = null
let boss: Sprite = null
let alienCount = 0
let message: TextSprite = null
let tilemaps: tiles.WorldMap[] = []
let mySprite: Sprite = null
let alienSpeed = 0
let gameStart = false
let spawn = false
let bossActive = false
let level = 0
createMaps()
level = 0
let levelCount = 1
bossActive = false
spawn = true
gameStart = true
alienSpeed = 20
let titlescreen = sprites.create(img`
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    `, SpriteKind.Title)
animation.runImageAnimation(
titlescreen,
[img`
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffff888ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffff866688fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffff866666888ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffff866666688fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffff866666668ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffff88666666688ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffff886666668fff6ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffff8866666ff69996ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffff886668fff9966ff6668fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffff8888fff5ff6fff666688ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffff8ffff5555fff66666888ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffff99f555ffff66666888fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffff9966ffffff66666888fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffff66ffffff666668888fffffffffffffffffffcb1dd1bcfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffff6666666888fffffffffffffffffffffc11dccd1bfcfffffffffffffffffcfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffff886666668fffffffcfcffffffffffffffcd1dbffcddcccffffffffffffffcbddbfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffff888866688ffffffcddcfccfffffffffffffcd1dbfffbcfcacfffffffffffffcd11dcccffcdcfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffff8888866fffffcccdd1dcfacfffffffffffffbd1dbfcfffcaacfffffffffffffcdddbfccffbdcfccffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffff888888ffff11dbcd11dcfcffffffffffffffbd1dbffffffccffffffffffffffffccffffcbddcfd1cfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffff8888fffcd11dbcd11dcffcbbbffcbbcffbbd111dbbbbbcfffcbbbffcbbcfffcbbbcfcbdd1dbbdbfffcbbbbcfffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffbdddccd11dccbddddbbddddbfcbbd1dbbbbdddbcbddddbbddddbfcbddddccbd11dbbcffcbddddddcffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffcccfcd11dcffbd1ddbbd11dcffbd1dbffbd1dbffbd1ddbbd11dcfcd11dcfcd11dcfffcdd1cf11dbfccfffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffcd11dcffbd1dbffbd1dcffbd1dbffbd1dbffbd1dbffbd1dcfcd11dcfcd11dcccfbd1bffb1dbfccfffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffcaaaccd11dcffbd1dbffbd1dbffbd1dbffbd1dbffbd1dbffbd1dbfcd11dcfcd11dccfcd11bffbdbfcacfffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffcaccd11dcffbd1dbffbd1dbffbd1dbffbd1dbffbd1dbffbd1dbfcd11dcfcd11dcffbd11bcdbcfcaacffffffeeeeeeeeeeeffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffcd11dcffbd1dbffbd1dbffbd1dbffbd1dbffbd1dbffbd1dbfcd11dcfcd11dcffbd111dcffcaaacffffffe222222222effffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffcd11dcffbd1dbffbd1dbffbd1dbffbd1dbffbd1dbffbd1dbfcd11dcfcd11dcffbd11bffcaaaccfffffcce222222222eccffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffcd11dcffbd1dbffbd1dbffbd1dbffbd1dbffbd1dbffbd1dbfcd11dcfcd11dcffbd11dfcaaacfffffffcce244444442eccffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffcd11dcffbd1dbffbd1dcffbd1dbffbd1dbffbd1dbffbd1dcfcd11dcfcd11dcffcd11dcfccffffffeeeeee244444442eeeeeefffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffcd11dcffbd1dbffbd1dcffbd1dbffbd1dbffbd1dbffbd1dcfcd11dcfcdd1dcccfbd11dcfffbcfff222222244444442222222fffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffcd11dcffbd1dbffbd1bfcfbd1dbffbd1dbffbd1dbffbd1bfccd11dcffbd1dbbcfcdd11dbb1bffe22444444444444444444422efffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffbdddcffcdddcfcd1dcfcfbd1dbffcdddbffcdddcfcd1dcfcfbdddfcfcddddbfcfcbd111dcfffe24444444444444444444442efffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffccffccffccffcddcfccfbd1dcfcffccfccffccffcddcfcaffccffacffccffcacfffccffffffe22222222222222222222222efffffffffffffffffffffffff
    ffffffffffffffffffffffffffffccbbbbbcccaaacffffbdbcfcacfbd1dccacfffcaacffffbdbcfcaacfffcaaacfffcaaaacfffffffe24ffcccccccccccccccccccccff42effffffffffffffffffffff
    ffffffffffffffffffffffffcbddddddddddddbccccccfffffffafcd1dbfaacccaaacccccfffffcaaccfcaaaaccccaaaaccffffffffe24ffcccccccccccccccccccccff42effffffffffffffffffffff
    fffffffffffffffffffffffb1bccbd11dbffcdddbcfcccfffbbfffb1dbfcaacfcccccffcccfccaaaccfffccccffffccccfffffffffffff22222ffcccccccccccff22222fffffffffffffffffffffffff
    ffffffffffffffffffffffc1cfffbd11dcfffcddddcfffccf1dbcbddbffaacffffffffffffccaacccfffffffffffffffffffffffffffffeeeeeffcccccccccccffeeeeefffffffffffffffffffffffff
    ffffffffffffffffffffffbbffffbd11dcfcffbd1dbffcffffbbbbbcffaaacffffffffffffffcccfffffffcbbcfffffffffffffffeeffffffff24fffffffffff42ffffffffffffffffffffffffffffff
    fffffffffffffffffffffcdbfccfbd11dcfccfbd11dcfcffffffffffcaaacfffffffffffffffffffffffffcbdbfccfffffffffffe24ffffffffeefffffffffffeeffffffffffffffffffffffffffffff
    fffffffffffffffffffffcdd11dcbd11dcfccfcd11dbffffcccccaaaaaccfffccfffffccffffffffffccfffb1bfccffffccffffe24fffccfffffffffccfffffcffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffbd11dcbd11dcfccfcd111dffcddddcccaccccffcddddbfcddddcfffffbddddddbb1cffffcddddddcfe2ffbdddddbfffcbddddccbdddbfff2efffffffffffffffffffffffff
    ffffffffffffffffffffffcdddbfbd11dcfcafcdd11dcbdd11dbfbdddddcccbd11dbdd11ddcfffbd1dcbd1ddcffffbd1bb111dfffcdd1bcd1dbffccd11dbddd11dbff42effffffffffffffffffffffff
    ffffffffffffffffffffffffcfffbd11dcfcaffbd11dcfcd11dbffcd11dcffbd11dbccd11dbffbd1dbffbd1dcfffbd1bffb11dcfcd11bffb11dbffcd11ddbcbd1ddff42effffffffffffffffffffffff
    ffffffffffffffffffffffffffffbd11dcfcaffbd11dcfcd11dbffcd11dcffbd11dcffdd1dbffd11dcffbd1dbffcd11bffb1dbffbd1dbffcd1ddcfcd11dbffbd11dcf42effffffffffffffffffffffff
    fffffffffffffffffffffffcaacfbd11dcfcaffbd11dcfcd11dbffcd11dcffbd11dcffbd1dbfcd11dcffbd11dcfbd11cffbdbcfcd11dcffcd11dcfcd11dbffcd11dcf42effffffffffffffffffffffff
    ffffffffffffffffffffffffcacfbd11dcfcafcdd11dcfcd11dbffcd11dcffbd11dcffbd11dfcd11dcffcd11dccd111cc1dcfffcd11dcffcd11dbfcd11dbffcd11dcf42effffffffffffffffffffffff
    ffffffffffffffffffffffffffffbd11dcfccfcdd1dbffcd11dbffcd11dcffbd11dcffbd11dccd11dcffbd11dfcd1111dbfffcfcd11dcffcd11dbfcd11dbffcd11dbf42effffffffffffffffffffffff
    ffffffffffffffffffffffffffffbd11dcfccfcd11dbffcd11dbffcd11dcffbd11dcffbd11dcfbd1dcffbd1dbfcd11dbcffcacfcd11dcffcd11dbfcd11dbffcd11dbf42effffffffffffffffffffffff
    ffffffffffffffffffffffffffffbd11dcfccfcd11dcffcd11dbffcd11dcffbd11dcffbd1dbffcd1dbffbd1dcfcd11dbffcaacfcd11dcffcd11dbfcd11dbffcd11dcf42effffffffffffffffffffffff
    ffffffffffffffffffffffffffffbd11dcfcffbd1dbfffcd11dbffcd11dcffbd11dcffbd1dbfffbd1dbbd1dcffcd11dbffcacffcd11dcffcd11dcfcd11dbffcd11dff2efffffffffffffffffffffffff
    ffffffffffffffffffffffffffffbd11dcfffcd1ddcfcfcd11dbffbd11dcffbd11dcffbd1dbfffcddddddbcffffbd11dcfffffffbd1dbffcd11dcfcd11dbffcd11dff2efffffffffffffffffffffffff
    ffffffffffffffffffffffffffffbd11dcfffbdddcfcaffd11dbfbdd11dcffbd11dcffbd1dcffcddcfffffffccfcdd11dcfffbbfcd1dbffbd1dcffcd11dbffcd1dff2effffffffffffffffffffffffff
    ffffffffffffffffffffffffffffcd11dbccbddbcffaaffbd11dddbd111dbfbd11dcffdd1bfffbd1bbccccffffffcd11111b1bcffcd1dbcd1dbfffcd11dbffbd1dffefffe2ffffffffffffffffffffff
    fffffffffffffffffffffffffffffbdddddddbcffcaaaffcbdddbcfbdddbffcdddbffcd1dcfffbd111111dddcffffcbdddddbfffffcbdddddcffcffbdddcffbd1fffefffe2ffffffffffffffffffffff
    ffffffffffffffffffffffffffffffcccbccffffcaaacffffccfffffccffffffccfffbddbffcfcd11111111ddbffffffccffffcaaffffccffffcacffccfffcd1dfffefffe2ffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffcaaaacfffffffffccfffffccfffffcbddcffccffcdddddddd11dcfccffffffcaaaaccffffffcaaaaffffffcddbffc2efffe2ffffffffffffffffffffff
    fffffffffffffffffffffffffffffcaccccaaaaaacffffffcccaaaaaccaaaaacccffcffffacffbdbffffcbdd1dcfaccaacaaaaaacffcaccaaaaaaffccccffcfffffffeeeffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffcaaaaaaaacfffffffffcaaaacfcaaaacffcacffffcaacfcd1cffffffcd1dcfacffcaaaaacffffffcaaaaacffffcacffffffffff222ffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffcaaaaacfbd1cffffffb1dcfcacffffffffffffffffffffffffffffffccaaaaacffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffcaaaacffcbddbbbbbdddcffaacfffffffffffffffffffffffffffffffaaaacffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffcbbbbbbbcfffaaacffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffcaaacfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffccccfffcccaaaacffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffcaaaaaaaaaaacfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffcccccccffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffc1dffffffffffffffffffffffc111dfffddcfffffffffffffffffffffffffbdffddfffffffffffffffd1bfffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffbdffffffffffffffffffffffcdcfdbffffffffffffffffffffffffffffffbdffddffffffffffffffffdbfffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffb111dcddffbdffddffffffffcdcfdbc11dfcdd111cfd11dfb1d11bffffffbdffddfd11dffd11dffd111bfffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffbdcfdbc1bfdbffffffffffffc111dfffbdffcdcfddbdffdbfcdcbbffffffb1111dbdffdbbdffdbbdffdbfffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffbdffddfddcdcffffffffffffcdcfffffbdffcdcfbdb1111bfcdcffffffffbdffddddffbdddffbddbffdbfffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffbdfcdbfb1bdfffffffffffffcdcfffffbdffcdcfdbbdfffffcdcffffffffbdffddbdcfdbbdcfdbbdfcdbfffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffb111dfffd1bfffddffffffffcdcfffc1111bc111dffd111bb111dfffffffbdffddfd11dffd11dfcd11d1cffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffcdcfffffffffffffffffffffffffcdcffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffc11bffffffffffffffffffffffffffcdcffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    `,img`
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffff888ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffff866688fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffff866666888ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffff866666688fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffff866666668ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffff88666666688ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffff886666668fff6ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffff8866666ff69996ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffff886668fff9966ff6668fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffff8888fff5ff6fff666688ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffff8ffff5555fff66666888ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffff99f111ffff66666888fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffff1166ffffff66666888fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffff16ffffff666668888fffffffffffffffffffcb1dd1bcfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffff6666666888fffffffffffffffffffffc11dccd1bfcfffffffffffffffffcfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffff886666668fffffffcfcffffffffffffffcd1dbffcddcccffffffffffffffcbddbfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffff888866688ffffffcddcfccfffffffffffffcd1dbfffbcfcacfffffffffffffcd11dcccffcdcfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffff8888866fffffcccdd1dcfacfffffffffffffbd1dbfcfffcaacfffffffffffffcdddbfccffbdcfccffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffff888888ffff11dbcd11dcfcffffffffffffffbd1dbffffffccffffffffffffffffccffffcbddcfd1cfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffff8888fffcd11dbcd11dcffcbbbffcbbcffbbd111dbbbbbcfffcbbbffcbbcfffcbbbcfcbdd1dbbdbfffcbbbbcfffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffbdddccd11dccbddddbbddddbfcbbd1dbbbbdddbcbddddbbddddbfcbddddccbd11dbbcffcbddddddcffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffcccfcd11dcffbd1ddbbd11dcffbd1dbffbd1dbffbd1ddbbd11dcfcd11dcfcd11dcfffcdd1cf11dbfccfffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffcd11dcffbd1dbffbd1dcffbd1dbffbd1dbffbd1dbffbd1dcfcd11dcfcd11dcccfbd1bffb1dbfccfffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffcaaaccd11dcffbd1dbffbd1dbffbd1dbffbd1dbffbd1dbffbd1dbfcd11dcfcd11dccfcd11bffbdbfcacfffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffcaccd11dcffbd1dbffbd1dbffbd1dbffbd1dbffbd1dbffbd1dbfcd11dcfcd11dcffbd11bcdbcfcaacffffffeeeeeeeeeeeffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffcd11dcffbd1dbffbd1dbffbd1dbffbd1dbffbd1dbffbd1dbfcd11dcfcd11dcffbd111dcffcaaacffffffe222222222effffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffcd11dcffbd1dbffbd1dbffbd1dbffbd1dbffbd1dbffbd1dbfcd11dcfcd11dcffbd11bffcaaaccfffffcce244444442eccffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffcd11dcffbd1dbffbd1dbffbd1dbffbd1dbffbd1dbffbd1dbfcd11dcfcd11dcffbd11dfcaaacfffffffcce244444442eccffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffcd11dcffbd1dbffbd1dcffbd1dbffbd1dbffbd1dbffbd1dcfcd11dcfcd11dcffcd11dcfccffffffeeeeefffffffffffeeeeefffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffcd11dcffbd1dbffbd1dcffbd1dbffbd1dbffbd1dbffbd1dcfcd11dcfcdd1dcccfbd11dcfffbcfff22444fffffffffff44422fffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffcd11dcffbd1dbffbd1bfcfbd1dbffbd1dbffbd1dbffbd1bfccd11dcffbd1dbbcfcdd11dbb1bffe2fffffffffffffffffffff2efffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffbdddcffcdddcfcd1dcfcfbd1dbffcdddbffcdddcfcd1dcfcfbdddfcfcddddbfcfcbd111dcfffe4fffffffffffffffffffff4efffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffccffccffccffcddcfccfbd1dcfcffccfccffccffcddcfcaffccffacffccffcacfffccffffffe4fffffffffffffffffffff4efffffffffffffffffffffffff
    ffffffffffffffffffffffffffffccbbbbbcccaaacffffbdbcfcacfbd1dccacfffcaacffffbdbcfcaacfffcaaacfffcaaaacfffffffe24ffcccff445fffff544ffcccff42effffffffffffffffffffff
    ffffffffffffffffffffffffcbddddddddddddbccccccfffffffafcd1dbfaacccaaacccccfffffcaaccfcaaaaccccaaaaccffffffffe24ffcccff445fffff544ffcccff42effffffffffffffffffffff
    fffffffffffffffffffffffb1bccbd11dbffcdddbcfcccfffbbfffb1dbfcaacfcccccffcccfccaaaccfffccccffffccccfffffffffffff22222fffff55555fffff22222fffffffffffffffffffffffff
    ffffffffffffffffffffffc1cfffbd11dcfffcddddcfffccf1dbcbddbffaacffffffffffffccaacccfffffffffffffffffffffffffffffeeeeefffff44444fffffeeeeefffffffffffffffffffffffff
    ffffffffffffffffffffffbbffffbd11dcfcffbd1dbffcffffbbbbbcffaaacffffffffffffffcccfffffffcbbcfffffffffffffffeeffffffff24fffffffffff42ffffffffffffffffffffffffffffff
    fffffffffffffffffffffcdbfccfbd11dcfccfbd11dcfcffffffffffcaaacfffffffffffffffffffffffffcbdbfccfffffffffffe24ffffffffeefffffffffffeeffffffffffffffffffffffffffffff
    fffffffffffffffffffffcdd11dcbd11dcfccfcd11dbffffcccccaaaaaccfffccfffffccffffffffffccfffb1bfccffffccffffe24fffccfffffffffccfffffcffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffbd11dcbd11dcfccfcd111dffcddddcccaccccffcddddbfcddddcfffffbddddddbb1cffffcddddddcfe2ffbdddddbfffcbddddccbdddbfff2efffffffffffffffffffffffff
    ffffffffffffffffffffffcdddbfbd11dcfcafcdd11dcbdd11dbfbdddddcccbd11dbdd11ddcfffbd1dcbd1ddcffffbd1bb111dfffcdd1bcd1dbffccd11dbddd11dbff42effffffffffffffffffffffff
    ffffffffffffffffffffffffcfffbd11dcfcaffbd11dcfcd11dbffcd11dcffbd11dbccd11dbffbd1dbffbd1dcfffbd1bffb11dcfcd11bffb11dbffcd11ddbcbd1ddff42effffffffffffffffffffffff
    ffffffffffffffffffffffffffffbd11dcfcaffbd11dcfcd11dbffcd11dcffbd11dcffdd1dbffd11dcffbd1dbffcd11bffb1dbffbd1dbffcd1ddcfcd11dbffbd11dcf42effffffffffffffffffffffff
    fffffffffffffffffffffffcaacfbd11dcfcaffbd11dcfcd11dbffcd11dcffbd11dcffbd1dbfcd11dcffbd11dcfbd11cffbdbcfcd11dcffcd11dcfcd11dbffcd11dcf42effffffffffffffffffffffff
    ffffffffffffffffffffffffcacfbd11dcfcafcdd11dcfcd11dbffcd11dcffbd11dcffbd11dfcd11dcffcd11dccd111cc1dcfffcd11dcffcd11dbfcd11dbffcd11dcf42effffffffffffffffffffffff
    ffffffffffffffffffffffffffffbd11dcfccfcdd1dbffcd11dbffcd11dcffbd11dcffbd11dccd11dcffbd11dfcd1111dbfffcfcd11dcffcd11dbfcd11dbffcd11dbf42effffffffffffffffffffffff
    ffffffffffffffffffffffffffffbd11dcfccfcd11dbffcd11dbffcd11dcffbd11dcffbd11dcfbd1dcffbd1dbfcd11dbcffcacfcd11dcffcd11dbfcd11dbffcd11dbf42effffffffffffffffffffffff
    ffffffffffffffffffffffffffffbd11dcfccfcd11dcffcd11dbffcd11dcffbd11dcffbd1dbffcd1dbffbd1dcfcd11dbffcaacfcd11dcffcd11dbfcd11dbffcd11dcf42effffffffffffffffffffffff
    ffffffffffffffffffffffffffffbd11dcfcffbd1dbfffcd11dbffcd11dcffbd11dcffbd1dbfffbd1dbbd1dcffcd11dbffcacffcd11dcffcd11dcfcd11dbffcd11dff2efffffffffffffffffffffffff
    ffffffffffffffffffffffffffffbd11dcfffcd1ddcfcfcd11dbffbd11dcffbd11dcffbd1dbfffcddddddbcffffbd11dcfffffffbd1dbffcd11dcfcd11dbffcd11dff2efffffffffffffffffffffffff
    ffffffffffffffffffffffffffffbd11dcfffbdddcfcaffd11dbfbdd11dcffbd11dcffbd1dcffcddcfffffffccfcdd11dcfffbbfcd1dbffbd1dcffcd11dbffcd1dff2effffffffffffffffffffffffff
    ffffffffffffffffffffffffffffcd11dbccbddbcffaaffbd11dddbd111dbfbd11dcffdd1bfffbd1bbccccffffffcd11111b1bcffcd1dbcd1dbfffcd11dbffbd1dffefffe2ffffffffffffffffffffff
    fffffffffffffffffffffffffffffbdddddddbcffcaaaffcbdddbcfbdddbffcdddbffcd1dcfffbd111111dddcffffcbdddddbfffffcbdddddcffcffbdddcffbd1fffefffe2ffffffffffffffffffffff
    ffffffffffffffffffffffffffffffcccbccffffcaaacffffccfffffccffffffccfffbddbffcfcd11111111ddbffffffccffffcaaffffccffffcacffccfffcd1dfffefffe2ffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffcaaaacfffffffffccfffffccfffffcbddcffccffcdddddddd11dcfccffffffcaaaaccffffffcaaaaffffffcddbffc2efffe2ffffffffffffffffffffff
    fffffffffffffffffffffffffffffcaccccaaaaaacffffffcccaaaaaccaaaaacccffcffffacffbdbffffcbdd1dcfaccaacaaaaaacffcaccaaaaaaffccccffcfffffffeeeffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffcaaaaaaaacfffffffffcaaaacfcaaaacffcacffffcaacfcd1cffffffcd1dcfacffcaaaaacffffffcaaaaacffffcacffffffffff222ffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffcaaaaacfbd1cffffffb1dcfcacffffffffffffffffffffffffffffffccaaaaacffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffcaaaacffcbddbbbbbdddcffaacfffffffffffffffffffffffffffffffaaaacffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffcbbbbbbbcfffaaacffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffcaaacfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffccccfffcccaaaacffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffcaaaaaaaaaaacfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffcccccccffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffc1dffffffffffffffffffffffc111dfffddcfffffffffffffffffffffffffbdffddfffffffffffffffd1bfffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffbdffffffffffffffffffffffcdcfdbffffffffffffffffffffffffffffffbdffddffffffffffffffffdbfffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffb111dcddffbdffddffffffffcdcfdbc11dfcdd111cfd11dfb1d11bffffffbdffddfd11dffd11dffd111bfffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffbdcfdbc1bfdbffffffffffffc111dfffbdffcdcfddbdffdbfcdcbbffffffb1111dbdffdbbdffdbbdffdbfffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffbdffddfddcdcffffffffffffcdcfffffbdffcdcfbdb1111bfcdcffffffffbdffddddffbdddffbddbffdbfffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffbdfcdbfb1bdfffffffffffffcdcfffffbdffcdcfdbbdfffffcdcffffffffbdffddbdcfdbbdcfdbbdfcdbfffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffb111dfffd1bfffddffffffffcdcfffc1111bc111dffd111bb111dfffffffbdffddfd11dffd11dfcd11d1cffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffcdcfffffffffffffffffffffffffcdcffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffc11bffffffffffffffffffffffffffcdcffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    `,img`
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffff888ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffff866688fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffff866666888ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffff866666688fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffff866666668ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffff88666666688ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffff886666668fff6ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffff8866666ff69996ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffff886668fff1166ff6668fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffff8888fff5ff1fff666688ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffff8ffff1111fff66666888ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffff11f555ffff66666888fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffff9916ffffff66666888fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffff96ffffff666668888fffffffffffffffffffcb1dd1bcfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffff6666666888fffffffffffffffffffffc11dccd1bfcfffffffffffffffffcfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffff886666668fffffffcfcffffffffffffffcd1dbffcddcccffffffffffffffcbddbfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffff888866688ffffffcddcfccfffffffffffffcd1dbfffbcfcacfffffffffffffcd11dcccffcdcfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffff8888866fffffcccdd1dcfacfffffffffffffbd1dbfcfffcaacfffffffffffffcdddbfccffbdcfccffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffff888888ffff11dbcd11dcfcffffffffffffffbd1dbffffffccffffffffffffffffccffffcbddcfd1cfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffff8888fffcd11dbcd11dcffcbbbffcbbcffbbd111dbbbbbcfffcbbbffcbbcfffcbbbcfcbdd1dbbdbfffcbbbbcfffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffbdddccd11dccbddddbbddddbfcbbd1dbbbbdddbcbddddbbddddbfcbddddccbd11dbbcffcbddddddcffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffcccfcd11dcffbd1ddbbd11dcffbd1dbffbd1dbffbd1ddbbd11dcfcd11dcfcd11dcfffcdd1cf11dbfccfffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffcd11dcffbd1dbffbd1dcffbd1dbffbd1dbffbd1dbffbd1dcfcd11dcfcd11dcccfbd1bffb1dbfccfffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffcaaaccd11dcffbd1dbffbd1dbffbd1dbffbd1dbffbd1dbffbd1dbfcd11dcfcd11dccfcd11bffbdbfcacfffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffcaccd11dcffbd1dbffbd1dbffbd1dbffbd1dbffbd1dbffbd1dbfcd11dcfcd11dcffbd11bcdbcfcaacffffff22222222222ffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffcd11dcffbd1dbffbd1dbffbd1dbffbd1dbffbd1dbffbd1dbfcd11dcfcd11dcffbd111dcffcaaacffffff22222222222ffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffcd11dcffbd1dbffbd1dbffbd1dbffbd1dbffbd1dbffbd1dbfcd11dcfcd11dcffbd11bffcaaaccfffff44fffffffffff44ffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffcd11dcffbd1dbffbd1dbffbd1dbffbd1dbffbd1dbffbd1dbfcd11dcfcd11dcffbd11dfcaaacfffffff45fffffffffff54ffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffcd11dcffbd1dbffbd1dcffbd1dbffbd1dbffbd1dbffbd1dcfcd11dcfcd11dcffcd11dcfccffffff222fffff44444fffff222fffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffcd11dcffbd1dbffbd1dcffbd1dbffbd1dbffbd1dbffbd1dcfcd11dcfcdd1dcccfbd11dcfffbcfff222fffff55555fffff222fffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffcd11dcffbd1dbffbd1bfcfbd1dbffbd1dbffbd1dbffbd1bfccd11dcffbd1dbbcfcdd11dbb1bffe2fffff445fffff544fffff2efffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffbdddcffcdddcfcd1dcfcfbd1dbffcdddbffcdddcfcd1dcfcfbdddfcfcddddbfcfcbd111dcfffe2fffff445fffff544fffff2efffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffccffccffccffcddcfccfbd1dcfcffccfccffccffcddcfcaffccffacffccffcacfffccffffffe4fffff445fffff544fffff4efffffffffffffffffffffffff
    ffffffffffffffffffffffffffffccbbbbbcccaaacffffbdbcfcacfbd1dccacfffcaacffffbdbcfcaacfffcaaacfffcaaaacfffffffe24ff455ff445fffff544ff554ff42effffffffffffffffffffff
    ffffffffffffffffffffffffcbddddddddddddbccccccfffffffafcd1dbfaacccaaacccccfffffcaaccfcaaaaccccaaaaccffffffffe24ff444ff445fffff544ff444ff42effffffffffffffffffffff
    fffffffffffffffffffffffb1bccbd11dbffcdddbcfcccfffbbfffb1dbfcaacfcccccffcccfccaaaccfffccccffffccccfffffffffffff22222fffff55555fffff22222fffffffffffffffffffffffff
    ffffffffffffffffffffffc1cfffbd11dcfffcddddcfffccf1dbcbddbffaacffffffffffffccaacccfffffffffffffffffffffffffffffeeeeefffff44444fffffeeeeefffffffffffffffffffffffff
    ffffffffffffffffffffffbbffffbd11dcfcffbd1dbffcffffbbbbbcffaaacffffffffffffffcccfffffffcbbcfffffffffffffffeeffffffff24fffffffffff42ffffffffffffffffffffffffffffff
    fffffffffffffffffffffcdbfccfbd11dcfccfbd11dcfcffffffffffcaaacfffffffffffffffffffffffffcbdbfccfffffffffffe24ffffffffeefffffffffffeeffffffffffffffffffffffffffffff
    fffffffffffffffffffffcdd11dcbd11dcfccfcd11dbffffcccccaaaaaccfffccfffffccffffffffffccfffb1bfccffffccffffe24fffccfffffffffccfffffcffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffbd11dcbd11dcfccfcd111dffcddddcccaccccffcddddbfcddddcfffffbddddddbb1cffffcddddddcfe2ffbdddddbfffcbddddccbdddbfff2efffffffffffffffffffffffff
    ffffffffffffffffffffffcdddbfbd11dcfcafcdd11dcbdd11dbfbdddddcccbd11dbdd11ddcfffbd1dcbd1ddcffffbd1bb111dfffcdd1bcd1dbffccd11dbddd11dbff42effffffffffffffffffffffff
    ffffffffffffffffffffffffcfffbd11dcfcaffbd11dcfcd11dbffcd11dcffbd11dbccd11dbffbd1dbffbd1dcfffbd1bffb11dcfcd11bffb11dbffcd11ddbcbd1ddff42effffffffffffffffffffffff
    ffffffffffffffffffffffffffffbd11dcfcaffbd11dcfcd11dbffcd11dcffbd11dcffdd1dbffd11dcffbd1dbffcd11bffb1dbffbd1dbffcd1ddcfcd11dbffbd11dcf42effffffffffffffffffffffff
    fffffffffffffffffffffffcaacfbd11dcfcaffbd11dcfcd11dbffcd11dcffbd11dcffbd1dbfcd11dcffbd11dcfbd11cffbdbcfcd11dcffcd11dcfcd11dbffcd11dcf42effffffffffffffffffffffff
    ffffffffffffffffffffffffcacfbd11dcfcafcdd11dcfcd11dbffcd11dcffbd11dcffbd11dfcd11dcffcd11dccd111cc1dcfffcd11dcffcd11dbfcd11dbffcd11dcf42effffffffffffffffffffffff
    ffffffffffffffffffffffffffffbd11dcfccfcdd1dbffcd11dbffcd11dcffbd11dcffbd11dccd11dcffbd11dfcd1111dbfffcfcd11dcffcd11dbfcd11dbffcd11dbf42effffffffffffffffffffffff
    ffffffffffffffffffffffffffffbd11dcfccfcd11dbffcd11dbffcd11dcffbd11dcffbd11dcfbd1dcffbd1dbfcd11dbcffcacfcd11dcffcd11dbfcd11dbffcd11dbf42effffffffffffffffffffffff
    ffffffffffffffffffffffffffffbd11dcfccfcd11dcffcd11dbffcd11dcffbd11dcffbd1dbffcd1dbffbd1dcfcd11dbffcaacfcd11dcffcd11dbfcd11dbffcd11dcf42effffffffffffffffffffffff
    ffffffffffffffffffffffffffffbd11dcfcffbd1dbfffcd11dbffcd11dcffbd11dcffbd1dbfffbd1dbbd1dcffcd11dbffcacffcd11dcffcd11dcfcd11dbffcd11dff2efffffffffffffffffffffffff
    ffffffffffffffffffffffffffffbd11dcfffcd1ddcfcfcd11dbffbd11dcffbd11dcffbd1dbfffcddddddbcffffbd11dcfffffffbd1dbffcd11dcfcd11dbffcd11dff2efffffffffffffffffffffffff
    ffffffffffffffffffffffffffffbd11dcfffbdddcfcaffd11dbfbdd11dcffbd11dcffbd1dcffcddcfffffffccfcdd11dcfffbbfcd1dbffbd1dcffcd11dbffcd1dff2effffffffffffffffffffffffff
    ffffffffffffffffffffffffffffcd11dbccbddbcffaaffbd11dddbd111dbfbd11dcffdd1bfffbd1bbccccffffffcd11111b1bcffcd1dbcd1dbfffcd11dbffbd1dffefffe2ffffffffffffffffffffff
    fffffffffffffffffffffffffffffbdddddddbcffcaaaffcbdddbcfbdddbffcdddbffcd1dcfffbd111111dddcffffcbdddddbfffffcbdddddcffcffbdddcffbd1fffefffe2ffffffffffffffffffffff
    ffffffffffffffffffffffffffffffcccbccffffcaaacffffccfffffccffffffccfffbddbffcfcd11111111ddbffffffccffffcaaffffccffffcacffccfffcd1dfffefffe2ffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffcaaaacfffffffffccfffffccfffffcbddcffccffcdddddddd11dcfccffffffcaaaaccffffffcaaaaffffffcddbffc2efffe2ffffffffffffffffffffff
    fffffffffffffffffffffffffffffcaccccaaaaaacffffffcccaaaaaccaaaaacccffcffffacffbdbffffcbdd1dcfaccaacaaaaaacffcaccaaaaaaffccccffcfffffffeeeffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffcaaaaaaaacfffffffffcaaaacfcaaaacffcacffffcaacfcd1cffffffcd1dcfacffcaaaaacffffffcaaaaacffffcacffffffffff222ffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffcaaaaacfbd1cffffffb1dcfcacffffffffffffffffffffffffffffffccaaaaacffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffcaaaacffcbddbbbbbdddcffaacfffffffffffffffffffffffffffffffaaaacffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffcbbbbbbbcfffaaacffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffcaaacfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffccccfffcccaaaacffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffcaaaaaaaaaaacfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffcccccccffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffc1dffffffffffffffffffffffc111dfffddcfffffffffffffffffffffffffbdffddfffffffffffffffd1bfffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffbdffffffffffffffffffffffcdcfdbffffffffffffffffffffffffffffffbdffddffffffffffffffffdbfffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffb111dcddffbdffddffffffffcdcfdbc11dfcdd111cfd11dfb1d11bffffffbdffddfd11dffd11dffd111bfffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffbdcfdbc1bfdbffffffffffffc111dfffbdffcdcfddbdffdbfcdcbbffffffb1111dbdffdbbdffdbbdffdbfffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffbdffddfddcdcffffffffffffcdcfffffbdffcdcfbdb1111bfcdcffffffffbdffddddffbdddffbddbffdbfffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffbdfcdbfb1bdfffffffffffffcdcfffffbdffcdcfdbbdfffffcdcffffffffbdffddbdcfdbbdcfdbbdfcdbfffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffb111dfffd1bfffddffffffffcdcfffc1111bc111dffd111bb111dfffffffbdffddfd11dffd11dfcd11d1cffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffcdcfffffffffffffffffffffffffcdcffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffc11bffffffffffffffffffffffffffcdcffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    `,img`
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffff888ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffff866688fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffff866666888ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffff866666688fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffff866666668ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffff88666666688ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffff886666668fff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffff8866666ff61116ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffff886668fff9916ff6668fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffff8888fff1ff6fff666688ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffff8ffff5555fff66666888ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffff99f555ffff66666888fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffff9996ffffff66666888fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffff96ffffff666668888fffffffffffffffffffcb1dd1bcfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffff6666666888fffffffffffffffffffffc11dccd1bfcfffffffffffffffffcfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffff886666668fffffffcfcffffffffffffffcd1dbffcddcccffffffffffffffcbddbfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffff888866688ffffffcddcfccfffffffffffffcd1dbfffbcfcacfffffffffffffcd11dcccffcdcfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffff8888866fffffcccdd1dcfacfffffffffffffbd1dbfcfffcaacfffffffffffffcdddbfccffbdcfccffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffff888888ffff11dbcd11dcfcffffffffffffffbd1dbffffffccffffffffffffffffccffffcbddcfd1cfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffff8888fffcd11dbcd11dcffcbbbffcbbcffbbd111dbbbbbcfffcbbbffcbbcfffcbbbcfcbdd1dbbdbfffcbbbbcfffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffbdddccd11dccbddddbbddddbfcbbd1dbbbbdddbcbddddbbddddbfcbddddccbd11dbbcffcbddddddcffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffcccfcd11dcffbd1ddbbd11dcffbd1dbffbd1dbffbd1ddbbd11dcfcd11dcfcd11dcfffcdd1cf11dbfccfffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffcd11dcffbd1dbffbd1dcffbd1dbffbd1dbffbd1dbffbd1dcfcd11dcfcd11dcccfbd1bffb1dbfccfffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffcaaaccd11dcffbd1dbffbd1dbffbd1dbffbd1dbffbd1dbffbd1dbfcd11dcfcd11dccfcd11bffbdbfcacfffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffcaccd11dcffbd1dbffbd1dbffbd1dbffbd1dbffbd1dbffbd1dbfcd11dcfcd11dcffbd11bcdbcfcaacffffffeeeeeeeeeeeffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffcd11dcffbd1dbffbd1dbffbd1dbffbd1dbffbd1dbffbd1dbfcd11dcfcd11dcffbd111dcffcaaacffffffe222222222effffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffcd11dcffbd1dbffbd1dbffbd1dbffbd1dbffbd1dbffbd1dbfcd11dcfcd11dcffbd11bffcaaaccfffffcce244444442eccffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffcd11dcffbd1dbffbd1dbffbd1dbffbd1dbffbd1dbffbd1dbfcd11dcfcd11dcffbd11dfcaaacfffffffcce244444442eccffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffcd11dcffbd1dbffbd1dcffbd1dbffbd1dbffbd1dbffbd1dcfcd11dcfcd11dcffcd11dcfccffffffeeeeefffffffffffeeeeefffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffcd11dcffbd1dbffbd1dcffbd1dbffbd1dbffbd1dbffbd1dcfcd11dcfcdd1dcccfbd11dcfffbcfff22444fffffffffff44422fffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffcd11dcffbd1dbffbd1bfcfbd1dbffbd1dbffbd1dbffbd1bfccd11dcffbd1dbbcfcdd11dbb1bffe2fffffffffffffffffffff2efffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffbdddcffcdddcfcd1dcfcfbd1dbffcdddbffcdddcfcd1dcfcfbdddfcfcddddbfcfcbd111dcfffe4fffffffffffffffffffff4efffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffccffccffccffcddcfccfbd1dcfcffccfccffccffcddcfcaffccffacffccffcacfffccffffffe4fffffffffffffffffffff4efffffffffffffffffffffffff
    ffffffffffffffffffffffffffffccbbbbbcccaaacffffbdbcfcacfbd1dccacfffcaacffffbdbcfcaacfffcaaacfffcaaaacfffffffe24ffcccff445fffff544ffcccff42effffffffffffffffffffff
    ffffffffffffffffffffffffcbddddddddddddbccccccfffffffafcd1dbfaacccaaacccccfffffcaaccfcaaaaccccaaaaccffffffffe24ffcccff445fffff544ffcccff42effffffffffffffffffffff
    fffffffffffffffffffffffb1bccbd11dbffcdddbcfcccfffbbfffb1dbfcaacfcccccffcccfccaaaccfffccccffffccccfffffffffffff22222fffff55555fffff22222fffffffffffffffffffffffff
    ffffffffffffffffffffffc1cfffbd11dcfffcddddcfffccf1dbcbddbffaacffffffffffffccaacccfffffffffffffffffffffffffffffeeeeefffff44444fffffeeeeefffffffffffffffffffffffff
    ffffffffffffffffffffffbbffffbd11dcfcffbd1dbffcffffbbbbbcffaaacffffffffffffffcccfffffffcbbcfffffffffffffffeeffffffff24fffffffffff42ffffffffffffffffffffffffffffff
    fffffffffffffffffffffcdbfccfbd11dcfccfbd11dcfcffffffffffcaaacfffffffffffffffffffffffffcbdbfccfffffffffffe24ffffffffeefffffffffffeeffffffffffffffffffffffffffffff
    fffffffffffffffffffffcdd11dcbd11dcfccfcd11dbffffcccccaaaaaccfffccfffffccffffffffffccfffb1bfccffffccffffe24fffccfffffffffccfffffcffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffbd11dcbd11dcfccfcd111dffcddddcccaccccffcddddbfcddddcfffffbddddddbb1cffffcddddddcfe2ffbdddddbfffcbddddccbdddbfff2efffffffffffffffffffffffff
    ffffffffffffffffffffffcdddbfbd11dcfcafcdd11dcbdd11dbfbdddddcccbd11dbdd11ddcfffbd1dcbd1ddcffffbd1bb111dfffcdd1bcd1dbffccd11dbddd11dbff42effffffffffffffffffffffff
    ffffffffffffffffffffffffcfffbd11dcfcaffbd11dcfcd11dbffcd11dcffbd11dbccd11dbffbd1dbffbd1dcfffbd1bffb11dcfcd11bffb11dbffcd11ddbcbd1ddff42effffffffffffffffffffffff
    ffffffffffffffffffffffffffffbd11dcfcaffbd11dcfcd11dbffcd11dcffbd11dcffdd1dbffd11dcffbd1dbffcd11bffb1dbffbd1dbffcd1ddcfcd11dbffbd11dcf42effffffffffffffffffffffff
    fffffffffffffffffffffffcaacfbd11dcfcaffbd11dcfcd11dbffcd11dcffbd11dcffbd1dbfcd11dcffbd11dcfbd11cffbdbcfcd11dcffcd11dcfcd11dbffcd11dcf42effffffffffffffffffffffff
    ffffffffffffffffffffffffcacfbd11dcfcafcdd11dcfcd11dbffcd11dcffbd11dcffbd11dfcd11dcffcd11dccd111cc1dcfffcd11dcffcd11dbfcd11dbffcd11dcf42effffffffffffffffffffffff
    ffffffffffffffffffffffffffffbd11dcfccfcdd1dbffcd11dbffcd11dcffbd11dcffbd11dccd11dcffbd11dfcd1111dbfffcfcd11dcffcd11dbfcd11dbffcd11dbf42effffffffffffffffffffffff
    ffffffffffffffffffffffffffffbd11dcfccfcd11dbffcd11dbffcd11dcffbd11dcffbd11dcfbd1dcffbd1dbfcd11dbcffcacfcd11dcffcd11dbfcd11dbffcd11dbf42effffffffffffffffffffffff
    ffffffffffffffffffffffffffffbd11dcfccfcd11dcffcd11dbffcd11dcffbd11dcffbd1dbffcd1dbffbd1dcfcd11dbffcaacfcd11dcffcd11dbfcd11dbffcd11dcf42effffffffffffffffffffffff
    ffffffffffffffffffffffffffffbd11dcfcffbd1dbfffcd11dbffcd11dcffbd11dcffbd1dbfffbd1dbbd1dcffcd11dbffcacffcd11dcffcd11dcfcd11dbffcd11dff2efffffffffffffffffffffffff
    ffffffffffffffffffffffffffffbd11dcfffcd1ddcfcfcd11dbffbd11dcffbd11dcffbd1dbfffcddddddbcffffbd11dcfffffffbd1dbffcd11dcfcd11dbffcd11dff2efffffffffffffffffffffffff
    ffffffffffffffffffffffffffffbd11dcfffbdddcfcaffd11dbfbdd11dcffbd11dcffbd1dcffcddcfffffffccfcdd11dcfffbbfcd1dbffbd1dcffcd11dbffcd1dff2effffffffffffffffffffffffff
    ffffffffffffffffffffffffffffcd11dbccbddbcffaaffbd11dddbd111dbfbd11dcffdd1bfffbd1bbccccffffffcd11111b1bcffcd1dbcd1dbfffcd11dbffbd1dffefffe2ffffffffffffffffffffff
    fffffffffffffffffffffffffffffbdddddddbcffcaaaffcbdddbcfbdddbffcdddbffcd1dcfffbd111111dddcffffcbdddddbfffffcbdddddcffcffbdddcffbd1fffefffe2ffffffffffffffffffffff
    ffffffffffffffffffffffffffffffcccbccffffcaaacffffccfffffccffffffccfffbddbffcfcd11111111ddbffffffccffffcaaffffccffffcacffccfffcd1dfffefffe2ffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffcaaaacfffffffffccfffffccfffffcbddcffccffcdddddddd11dcfccffffffcaaaaccffffffcaaaaffffffcddbffc2efffe2ffffffffffffffffffffff
    fffffffffffffffffffffffffffffcaccccaaaaaacffffffcccaaaaaccaaaaacccffcffffacffbdbffffcbdd1dcfaccaacaaaaaacffcaccaaaaaaffccccffcfffffffeeeffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffcaaaaaaaacfffffffffcaaaacfcaaaacffcacffffcaacfcd1cffffffcd1dcfacffcaaaaacffffffcaaaaacffffcacffffffffff222ffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffcaaaaacfbd1cffffffb1dcfcacffffffffffffffffffffffffffffffccaaaaacffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffcaaaacffcbddbbbbbdddcffaacfffffffffffffffffffffffffffffffaaaacffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffcbbbbbbbcfffaaacffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffcaaacfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffccccfffcccaaaacffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffcaaaaaaaaaaacfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffcccccccffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffc1dffffffffffffffffffffffc111dfffddcfffffffffffffffffffffffffbdffddfffffffffffffffd1bfffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffbdffffffffffffffffffffffcdcfdbffffffffffffffffffffffffffffffbdffddffffffffffffffffdbfffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffb111dcddffbdffddffffffffcdcfdbc11dfcdd111cfd11dfb1d11bffffffbdffddfd11dffd11dffd111bfffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffbdcfdbc1bfdbffffffffffffc111dfffbdffcdcfddbdffdbfcdcbbffffffb1111dbdffdbbdffdbbdffdbfffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffbdffddfddcdcffffffffffffcdcfffffbdffcdcfbdb1111bfcdcffffffffbdffddddffbdddffbddbffdbfffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffbdfcdbfb1bdfffffffffffffcdcfffffbdffcdcfdbbdfffffcdcffffffffbdffddbdcfdbbdcfdbbdfcdbfffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffb111dfffd1bfffddffffffffcdcfffc1111bc111dffd111bb111dfffffffbdffddfd11dffd11dfcd11d1cffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffcdcfffffffffffffffffffffffffcdcffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffc11bffffffffffffffffffffffffffcdcffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    `,img`
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffff888ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffff866688fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffff866666888ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffff866666688fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffff866666668ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffff88666666688ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffff886666668fff6ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffff8866666ff69996ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffff886668fff9966ff6668fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffff8888fff5ff6fff666688ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffff8ffff5555fff66666888ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffff99f555ffff66666888fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffff9966ffffff66666888fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffff66ffffff666668888fffffffffffffffffffcb1dd1bcfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffff6666666888fffffffffffffffffffffc11dccd1bfcfffffffffffffffffcfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffff886666668fffffffcfcffffffffffffffcd1dbffcddcccffffffffffffffcbddbfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffff888866688ffffffcddcfccfffffffffffffcd1dbfffbcfcacfffffffffffffcd11dcccffcdcfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffff8888866fffffcccdd1dcfacfffffffffffffbd1dbfcfffcaacfffffffffffffcdddbfccffbdcfccffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffff888888ffff11dbcd11dcfcffffffffffffffbd1dbffffffccffffffffffffffffccffffcbddcfd1cfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffff8888fffcd11dbcd11dcffcbbbffcbbcffbbd111dbbbbbcfffcbbbffcbbcfffcbbbcfcbdd1dbbdbfffcbbbbcfffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffbdddccd11dccbddddbbddddbfcbbd1dbbbbdddbcbddddbbddddbfcbddddccbd11dbbcffcbddddddcffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffcccfcd11dcffbd1ddbbd11dcffbd1dbffbd1dbffbd1ddbbd11dcfcd11dcfcd11dcfffcdd1cf11dbfccfffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffcd11dcffbd1dbffbd1dcffbd1dbffbd1dbffbd1dbffbd1dcfcd11dcfcd11dcccfbd1bffb1dbfccfffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffcaaaccd11dcffbd1dbffbd1dbffbd1dbffbd1dbffbd1dbffbd1dbfcd11dcfcd11dccfcd11bffbdbfcacfffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffcaccd11dcffbd1dbffbd1dbffbd1dbffbd1dbffbd1dbffbd1dbfcd11dcfcd11dcffbd11bcdbcfcaacffffffeeeeeeeeeeeffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffcd11dcffbd1dbffbd1dbffbd1dbffbd1dbffbd1dbffbd1dbfcd11dcfcd11dcffbd111dcffcaaacffffffe222222222effffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffcd11dcffbd1dbffbd1dbffbd1dbffbd1dbffbd1dbffbd1dbfcd11dcfcd11dcffbd11bffcaaaccfffffcce222222222eccffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffcd11dcffbd1dbffbd1dbffbd1dbffbd1dbffbd1dbffbd1dbfcd11dcfcd11dcffbd11dfcaaacfffffffcce244444442eccffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffcd11dcffbd1dbffbd1dcffbd1dbffbd1dbffbd1dbffbd1dcfcd11dcfcd11dcffcd11dcfccffffffeeeeee244444442eeeeeefffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffcd11dcffbd1dbffbd1dcffbd1dbffbd1dbffbd1dbffbd1dcfcd11dcfcdd1dcccfbd11dcfffbcfff222222244444442222222fffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffcd11dcffbd1dbffbd1bfcfbd1dbffbd1dbffbd1dbffbd1bfccd11dcffbd1dbbcfcdd11dbb1bffe22444444444444444444422efffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffbdddcffcdddcfcd1dcfcfbd1dbffcdddbffcdddcfcd1dcfcfbdddfcfcddddbfcfcbd111dcfffe24444444444444444444442efffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffccffccffccffcddcfccfbd1dcfcffccfccffccffcddcfcaffccffacffccffcacfffccffffffe22222222222222222222222efffffffffffffffffffffffff
    ffffffffffffffffffffffffffffccbbbbbcccaaacffffbdbcfcacfbd1dccacfffcaacffffbdbcfcaacfffcaaacfffcaaaacfffffffe24ffcccccccccccccccccccccff42effffffffffffffffffffff
    ffffffffffffffffffffffffcbddddddddddddbccccccfffffffafcd1dbfaacccaaacccccfffffcaaccfcaaaaccccaaaaccffffffffe24ffcccccccccccccccccccccff42effffffffffffffffffffff
    fffffffffffffffffffffffb1bccbd11dbffcdddbcfcccfffbbfffb1dbfcaacfcccccffcccfccaaaccfffccccffffccccfffffffffffff22222ffcccccccccccff22222fffffffffffffffffffffffff
    ffffffffffffffffffffffc1cfffbd11dcfffcddddcfffccf1dbcbddbffaacffffffffffffccaacccfffffffffffffffffffffffffffffeeeeeffcccccccccccffeeeeefffffffffffffffffffffffff
    ffffffffffffffffffffffbbffffbd11dcfcffbd1dbffcffffbbbbbcffaaacffffffffffffffcccfffffffcbbcfffffffffffffffeeffffffff24fffffffffff42ffffffffffffffffffffffffffffff
    fffffffffffffffffffffcdbfccfbd11dcfccfbd11dcfcffffffffffcaaacfffffffffffffffffffffffffcbdbfccfffffffffffe24ffffffffeefffffffffffeeffffffffffffffffffffffffffffff
    fffffffffffffffffffffcdd11dcbd11dcfccfcd11dbffffcccccaaaaaccfffccfffffccffffffffffccfffb1bfccffffccffffe24fffccfffffffffccfffffcffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffbd11dcbd11dcfccfcd111dffcddddcccaccccffcddddbfcddddcfffffbddddddbb1cffffcddddddcfe2ffbdddddbfffcbddddccbdddbfff2efffffffffffffffffffffffff
    ffffffffffffffffffffffcdddbfbd11dcfcafcdd11dcbdd11dbfbdddddcccbd11dbdd11ddcfffbd1dcbd1ddcffffbd1bb111dfffcdd1bcd1dbffccd11dbddd11dbff42effffffffffffffffffffffff
    ffffffffffffffffffffffffcfffbd11dcfcaffbd11dcfcd11dbffcd11dcffbd11dbccd11dbffbd1dbffbd1dcfffbd1bffb11dcfcd11bffb11dbffcd11ddbcbd1ddff42effffffffffffffffffffffff
    ffffffffffffffffffffffffffffbd11dcfcaffbd11dcfcd11dbffcd11dcffbd11dcffdd1dbffd11dcffbd1dbffcd11bffb1dbffbd1dbffcd1ddcfcd11dbffbd11dcf42effffffffffffffffffffffff
    fffffffffffffffffffffffcaacfbd11dcfcaffbd11dcfcd11dbffcd11dcffbd11dcffbd1dbfcd11dcffbd11dcfbd11cffbdbcfcd11dcffcd11dcfcd11dbffcd11dcf42effffffffffffffffffffffff
    ffffffffffffffffffffffffcacfbd11dcfcafcdd11dcfcd11dbffcd11dcffbd11dcffbd11dfcd11dcffcd11dccd111cc1dcfffcd11dcffcd11dbfcd11dbffcd11dcf42effffffffffffffffffffffff
    ffffffffffffffffffffffffffffbd11dcfccfcdd1dbffcd11dbffcd11dcffbd11dcffbd11dccd11dcffbd11dfcd1111dbfffcfcd11dcffcd11dbfcd11dbffcd11dbf42effffffffffffffffffffffff
    ffffffffffffffffffffffffffffbd11dcfccfcd11dbffcd11dbffcd11dcffbd11dcffbd11dcfbd1dcffbd1dbfcd11dbcffcacfcd11dcffcd11dbfcd11dbffcd11dbf42effffffffffffffffffffffff
    ffffffffffffffffffffffffffffbd11dcfccfcd11dcffcd11dbffcd11dcffbd11dcffbd1dbffcd1dbffbd1dcfcd11dbffcaacfcd11dcffcd11dbfcd11dbffcd11dcf42effffffffffffffffffffffff
    ffffffffffffffffffffffffffffbd11dcfcffbd1dbfffcd11dbffcd11dcffbd11dcffbd1dbfffbd1dbbd1dcffcd11dbffcacffcd11dcffcd11dcfcd11dbffcd11dff2efffffffffffffffffffffffff
    ffffffffffffffffffffffffffffbd11dcfffcd1ddcfcfcd11dbffbd11dcffbd11dcffbd1dbfffcddddddbcffffbd11dcfffffffbd1dbffcd11dcfcd11dbffcd11dff2efffffffffffffffffffffffff
    ffffffffffffffffffffffffffffbd11dcfffbdddcfcaffd11dbfbdd11dcffbd11dcffbd1dcffcddcfffffffccfcdd11dcfffbbfcd1dbffbd1dcffcd11dbffcd1dff2effffffffffffffffffffffffff
    ffffffffffffffffffffffffffffcd11dbccbddbcffaaffbd11dddbd111dbfbd11dcffdd1bfffbd1bbccccffffffcd11111b1bcffcd1dbcd1dbfffcd11dbffbd1dffefffe2ffffffffffffffffffffff
    fffffffffffffffffffffffffffffbdddddddbcffcaaaffcbdddbcfbdddbffcdddbffcd1dcfffbd111111dddcffffcbdddddbfffffcbdddddcffcffbdddcffbd1fffefffe2ffffffffffffffffffffff
    ffffffffffffffffffffffffffffffcccbccffffcaaacffffccfffffccffffffccfffbddbffcfcd11111111ddbffffffccffffcaaffffccffffcacffccfffcd1dfffefffe2ffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffcaaaacfffffffffccfffffccfffffcbddcffccffcdddddddd11dcfccffffffcaaaaccffffffcaaaaffffffcddbffc2efffe2ffffffffffffffffffffff
    fffffffffffffffffffffffffffffcaccccaaaaaacffffffcccaaaaaccaaaaacccffcffffacffbdbffffcbdd1dcfaccaacaaaaaacffcaccaaaaaaffccccffcfffffffeeeffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffcaaaaaaaacfffffffffcaaaacfcaaaacffcacffffcaacfcd1cffffffcd1dcfacffcaaaaacffffffcaaaaacffffcacffffffffff222ffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffcaaaaacfbd1cffffffb1dcfcacffffffffffffffffffffffffffffffccaaaaacffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffcaaaacffcbddbbbbbdddcffaacfffffffffffffffffffffffffffffffaaaacffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffcbbbbbbbcfffaaacffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffcaaacfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffccccfffcccaaaacffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffcaaaaaaaaaaacfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffcccccccffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffc1dffffffffffffffffffffffc111dfffddcfffffffffffffffffffffffffbdffddfffffffffffffffd1bfffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffbdffffffffffffffffffffffcdcfdbffffffffffffffffffffffffffffffbdffddffffffffffffffffdbfffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffb111dcddffbdffddffffffffcdcfdbc11dfcdd111cfd11dfb1d11bffffffbdffddfd11dffd11dffd111bfffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffbdcfdbc1bfdbffffffffffffc111dfffbdffcdcfddbdffdbfcdcbbffffffb1111dbdffdbbdffdbbdffdbfffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffbdffddfddcdcffffffffffffcdcfffffbdffcdcfbdb1111bfcdcffffffffbdffddddffbdddffbddbffdbfffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffbdfcdbfb1bdfffffffffffffcdcfffffbdffcdcfdbbdfffffcdcffffffffbdffddbdcfdbbdcfdbbdfcdbfffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffb111dfffd1bfffddffffffffcdcfffc1111bc111dffd111bb111dfffffffbdffddfd11dffd11dfcd11d1cffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffcdcfffffffffffffffffffffffffcdcffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffc11bffffffffffffffffffffffffffcdcffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    `],
300,
false
)
music.spooky.play()
pause(2100)
info.setScore(0)
info.player2.setScore(levelCount)
info.setLife(3)
createPlayer()
mySprite.setPosition(72, 230)
tiles.loadMap(tilemaps[level])
titlescreen.destroy()
color.startFade(color.Black, color.originalPalette, 500)
pause(1000)
message = textsprite.create("press (A) to shoot")
music.playTone(262, music.beat(BeatFraction.Half))
textsprite2()
pause(500)
message = textsprite.create("hold (B) to shield")
music.playTone(262, music.beat(BeatFraction.Half))
textsprite2()
pause(500)
gameStart = false
message = textsprite.create("watch out!")
music.playTone(523, music.beat(BeatFraction.Half))
textsprite2()
pause(1000)
surprise()
createAlien()
game.onUpdate(function () {
    for (let value of sprites.allOfKind(SpriteKind.Enemy)) {
        if (value.isHittingTile(CollisionDirection.Left)) {
            alien.vx = alienSpeed
        } else if (value.isHittingTile(CollisionDirection.Right)) {
            alien.vx = -1 * alienSpeed
        } else if (value.isHittingTile(CollisionDirection.Bottom)) {
            alien.vy = -1 * alienSpeed
        } else if (value.isHittingTile(CollisionDirection.Top)) {
            alien.vy = alienSpeed
        }
    }
})
game.onUpdate(function () {
    info.player2.setScore(levelCount)
})
forever(function () {
    for (let value of sprites.allOfKind(SpriteKind.Enemy)) {
        animation.runImageAnimation(
        value,
        [img`
            . . . . . f f f f f f . . . . . 
            . . . . f f 2 2 2 2 f f . . . . 
            . . . f f c 2 2 2 2 c f f . . . 
            . . . f 2 2 2 2 2 2 2 2 f . . . 
            . . f 2 2 2 2 2 2 2 2 2 2 f . . 
            . f 2 f c c c c c c c c f 2 f . 
            . f f 2 2 f c c c c f 2 2 f f . 
            . . f f f 2 f f f f 2 f f f . . 
            . . f 2 f f f 2 2 f f f 2 f . . 
            . . f 2 f . f 2 f . . f 2 f . . 
            . . . f 2 f . f 2 2 . 2 f . . . 
            . . 2 f 2 f . f 2 f . 2 f 2 . . 
            . . f 2 f . f 2 f . . f 2 f . . 
            . . . f . . f 2 f . . . f . . . 
            . . . . . . f 2 2 f . . . . . . 
            . . . . . . . f f . . . . . . . 
            `,img`
            . . . . . f f f f f f . . . . . 
            . . . . f f 2 2 2 2 f f . . . . 
            . . . f f c 2 2 2 2 c f f . . . 
            . . . f 2 2 f f f f 2 2 f . . . 
            . . f 2 f f f f f f f f 2 f . . 
            . f 2 f c f 4 f f 4 f c f 2 f . 
            . f f 2 2 f f 4 4 f f 2 2 f f . 
            . . f f f 2 f f f f 2 f f f . . 
            . . f 2 f f f 2 2 f f f 2 f . . 
            . . f 2 f . f 2 f . . f 2 f . . 
            . . . f 2 f . f 2 2 . 2 f . . . 
            . . 2 f 2 f . f 2 f . 2 f 2 . . 
            . . f 2 f . f 2 f . . f 2 f . . 
            . . . f . . f 2 f . . . f . . . 
            . . . . . . f 2 2 f . . . . . . 
            . . . . . . . f f . . . . . . . 
            `,img`
            . . . . . f f f f f f . . . . . 
            . . . . f f 2 2 2 2 f f . . . . 
            . . . f f c f f f f c f f . . . 
            . . . f 2 f f 4 4 f f 2 f . . . 
            . . f 2 f f 4 f f 4 f f 2 f . . 
            . f 2 f c f 4 f f 4 f c f 2 f . 
            . f f 2 2 f f 4 4 f f 2 2 f f . 
            . . f f f 2 f f f f 2 f f f . . 
            . . f 2 f f f 2 2 f f f 2 f . . 
            . . f 2 f . f 2 f . . f 2 f . . 
            . . . f 2 f . f 2 2 . 2 f . . . 
            . . 2 f 2 f . f 2 f . 2 f 2 . . 
            . . f 2 f . f 2 f . . f 2 f . . 
            . . . f . . f 2 f . . . f . . . 
            . . . . . . f 2 2 f . . . . . . 
            . . . . . . . f f . . . . . . . 
            `,img`
            . . . . . f f f f f f . . . . . 
            . . . . f f 2 2 2 2 f f . . . . 
            . . . f f 5 f f f f 5 f f . . . 
            . . . f 2 f f 4 4 f f 2 f . . . 
            . . f 2 f f 4 f f 4 f f 2 f . . 
            . f 2 f 5 f 4 f f 4 f 5 f 2 f . 
            . f f 2 2 f f 4 4 f f 2 2 f f . 
            . . f f f 2 f f f f 2 f f f . . 
            . . f 2 f f f 2 2 f f f 2 f . . 
            . . f 2 f . f 2 f . . f 2 f . . 
            . . . f 2 f . f 2 2 . 2 f . . . 
            . . 2 f 2 f . f 2 f . 2 f 2 . . 
            . . f 2 f . f 2 f . . f 2 f . . 
            . . . f . . f 2 f . . . f . . . 
            . . . . . . f 2 2 f . . . . . . 
            . . . . . . . f f . . . . . . . 
            `,img`
            . . . . . f f f f f f . . . . . 
            . . . . f f 2 2 2 2 f f . . . . 
            . . . f f c f f f f c f f . . . 
            . . . f 2 f f 4 4 f f 2 f . . . 
            . . f 2 f f 4 f f 4 f f 2 f . . 
            . f 2 f c f 4 f f 4 f c f 2 f . 
            . f f 2 2 f f 4 4 f f 2 2 f f . 
            . . f f f 2 f f f f 2 f f f . . 
            . . f 2 f f f 2 2 f f f 2 f . . 
            . . f 2 f . f 2 f . . f 2 f . . 
            . . . f 2 f . f 2 2 . 2 f . . . 
            . . 2 f 2 f . f 2 f . 2 f 2 . . 
            . . f 2 f . f 2 f . . f 2 f . . 
            . . . f . . f 2 f . . . f . . . 
            . . . . . . f 2 2 f . . . . . . 
            . . . . . . . f f . . . . . . . 
            `,img`
            . . . . . f f f f f f . . . . . 
            . . . . f f 2 2 2 2 f f . . . . 
            . . . f f c 2 2 2 2 c f f . . . 
            . . . f 2 2 f f f f 2 2 f . . . 
            . . f 2 f f f f f f f f 2 f . . 
            . f 2 f c f 4 f f 4 f c f 2 f . 
            . f f 2 2 f 4 4 4 4 f 2 2 f f . 
            . . f f f 2 f f f f 2 f f f . . 
            . . f 2 f f f 2 2 f f f 2 f . . 
            . . f 2 f . f 2 f . . f 2 f . . 
            . . . f 2 f . f 2 2 . 2 f . . . 
            . . 2 f 2 f . f 2 f . 2 f 2 . . 
            . . f 2 f . f 2 f . . f 2 f . . 
            . . . f . . f 2 f . . . f . . . 
            . . . . . . f 2 2 f . . . . . . 
            . . . . . . . f f . . . . . . . 
            `],
        200,
        true
        )
        pause(2500)
    }
})
forever(function () {
    for (let value of sprites.allOfKind(SpriteKind.Boss)) {
        animation.runImageAnimation(
        value,
        [img`
            ........ffffffff........
            ....fffffaaaaaafffff....
            ..ffaaafaffffffafaaaff..
            .faaafffffaaaafffffaaaf.
            .fafffaffcaaaacffafffaf.
            .fffaaafaaaaaaaafaaafff.
            .fcccaafaaaaaaaafaacccf.
            facccaffccccccccffacccaf
            facccfaaafccccfaaafcccaf
            ffffaafffcffffcfffaaffff
            .faaffaf.ffaaff.faffaaf.
            ..fa.faf..faf...faf.af..
            .aaf..faf..faa.faf..faa.
            .faf.afaf..faf.fafa.faf.
            ..fa.faf..faf...faf.af..
            ..faf.f...faf....f.faf..
            .faaf.....faaf.....faaf.
            ..ff.......ff.......ff..
            `,img`
            ........ffffffff........
            ....fffffaaaaaafffff....
            ..ffaaafaffffffafaaaff..
            .faaafffffaaaafffffaaaf.
            .fafffaffcaaaacffafffaf.
            .fffaaafaaaaaaaafaaafff.
            .fcccaffaaffffaaffacccf.
            faffffffcf4ff4fcffffffaf
            fa444faaaf4444faaaf444af
            ffffaafffcffffcfffaaffff
            .faaffaf.ffaaff.faffaaf.
            ..fa.faf..faf...faf.af..
            .aaf..faf..faa.faf..faa.
            .faf.afaf..faf.fafa.faf.
            ..fa.faf..faf...faf.af..
            ..faf.f...faf....f.faf..
            .faaf.....faaf.....faaf.
            ..ff.......ff.......ff..
            `,img`
            ........ffffffff........
            ....fffffaaaaaafffff....
            ..ffaaafaffffffafaaaff..
            .faaafffffaaaafffffaaaf.
            .fafffaff4ffff4ffafffaf.
            .fffaaafaf4444fafaaafff.
            .f444aafff4ff4fffaa444f.
            fa4f4aff4f4ff4f4ffa4f4af
            fa444faaaf4444faaaf444af
            ffffaafff4ffff4fffaaffff
            .faaffaf.ffaaff.faffaaf.
            ..fa.faf..faf...faf.af..
            .aaf..faf..faa.faf..faa.
            .faf.afaf..faf.fafa.faf.
            ..fa.faf..faf...faf.af..
            ..faf.f...faf....f.faf..
            .faaf.....faaf.....faaf.
            ..ff.......ff.......ff..
            `,img`
            ........ffffffff........
            ....fffffaaaaaafffff....
            ..ffaaafaffffffafaaaff..
            .faaafffffaaaafffffaaaf.
            .fafffaff5ffff5ffafffaf.
            .fffaaafaf4444fafaaafff.
            .f444aafff4ff4fffaa444f.
            fa4f4aff5f4ff4f5ffa4f4af
            fa444faaaf4444faaaf444af
            ffffaafff5ffff5fffaaffff
            .faaffaf.ffaaff.faffaaf.
            ..fa.faf..faf...faf.af..
            .aaf..faf..faa.faf..faa.
            .faf.afaf..faf.fafa.faf.
            ..fa.faf..faf...faf.af..
            ..faf.f...faf....f.faf..
            .faaf.....faaf.....faaf.
            ..ff.......ff.......ff..
            `,img`
            ........ffffffff........
            ....fffffaaaaaafffff....
            ..ffaaafaffffffafaaaff..
            .faaafffffaaaafffffaaaf.
            .fafffaff5ffff5ffafffaf.
            .fffaaafaf4554fafaaafff.
            .f454aafff5ff5fffaa454f.
            fa5f5aff5f5ff5f5ffa5f5af
            fa454faaaf4554faaaf454af
            ffffaafff5ffff5fffaaffff
            .faaffaf.ffaaff.faffaaf.
            ..fa.faf..faf...faf.af..
            .aaf..faf..faa.faf..faa.
            .faf.afaf..faf.fafa.faf.
            ..fa.faf..faf...faf.af..
            ..faf.f...faf....f.faf..
            .faaf.....faaf.....faaf.
            ..ff.......ff.......ff..
            `,img`
            ........ffffffff........
            ....fffffaaaaaafffff....
            ..ffaaafaffffffafaaaff..
            .faaafffffaaaafffffaaaf.
            .fafffaff5ffff5ffafffaf.
            .fffaaafaf4444fafaaafff.
            .f444aafff4ff4fffaa444f.
            fa4f4aff5f4ff4f5ffa4f4af
            fa444faaaf4444faaaf444af
            ffffaafff5ffff5fffaaffff
            .faaffaf.ffaaff.faffaaf.
            ..fa.faf..faf...faf.af..
            .aaf..faf..faa.faf..faa.
            .faf.afaf..faf.fafa.faf.
            ..fa.faf..faf...faf.af..
            ..faf.f...faf....f.faf..
            .faaf.....faaf.....faaf.
            ..ff.......ff.......ff..
            `,img`
            ........ffffffff........
            ....fffffaaaaaafffff....
            ..ffaaafaffffffafaaaff..
            .faaafffffaaaafffffaaaf.
            .fafffaff4ffff4ffafffaf.
            .fffaaafaf4444fafaaafff.
            .f444aafff4ff4fffaa444f.
            fa4f4aff4f4ff4f4ffa4f4af
            fa444faaaf4444faaaf444af
            ffffaafff4ffff4fffaaffff
            .faaffaf.ffaaff.faffaaf.
            ..fa.faf..faf...faf.af..
            .aaf..faf..faa.faf..faa.
            .faf.afaf..faf.fafa.faf.
            ..fa.faf..faf...faf.af..
            ..faf.f...faf....f.faf..
            .faaf.....faaf.....faaf.
            ..ff.......ff.......ff..
            `,img`
            ........ffffffff........
            ....fffffaaaaaafffff....
            ..ffaaafaffffffafaaaff..
            .faaafffffaaaafffffaaaf.
            .fafffaffcaaaacffafffaf.
            .fffaaafaaaaaaaafaaafff.
            .fcccaffaaffffaaffacccf.
            faffffffcf4ff4fcffffffaf
            fa444faaaf4444faaaf444af
            ffffaafffcffffcfffaaffff
            .faaffaf.ffaaff.faffaaf.
            ..fa.faf..faf...faf.af..
            .aaf..faf..faa.faf..faa.
            .faf.afaf..faf.fafa.faf.
            ..fa.faf..faf...faf.af..
            ..faf.f...faf....f.faf..
            .faaf.....faaf.....faaf.
            ..ff.......ff.......ff..
            `,img`
            ........ffffffff........
            ....fffffaaaaaafffff....
            ..ffaaafaffffffafaaaff..
            .faaafffffaaaafffffaaaf.
            .fafffaffcaaaacffafffaf.
            .fffaaafaaaaaaaafaaafff.
            .fcccaafaaaaaaaafaacccf.
            facccaffccccccccffacccaf
            facccfaaafccccfaaafcccaf
            ffffaafffcffffcfffaaffff
            .faaffaf.ffaaff.faffaaf.
            ..fa.faf..faf...faf.af..
            .aaf..faf..faa.faf..faa.
            .faf.afaf..faf.fafa.faf.
            ..fa.faf..faf...faf.af..
            ..faf.f...faf....f.faf..
            .faaf.....faaf.....faaf.
            ..ff.......ff.......ff..
            `],
        200,
        true
        )
        pause(5000)
    }
})
