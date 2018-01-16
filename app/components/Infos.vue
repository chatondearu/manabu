<template>
  <div class="infos">
    <picture>
      <img src="~assets/manabu-logo-inline.png">
    </picture>
    <h1>Manabu Project<br><small>Manabu was a simple tool for learning and more</small></h1>
    <h2>Éditorial</h2>
    <p>Romain:</p>
    <p><bui-icon icon="format-quote"></bui-icon> Le projet est venus le jour où je me suis mis à apprendre le Japonais avant une rencontre avec ma belle famille.<br> Dans ce contexte le besoin d'un outil simple pour me créer des cartes de révision mais aussi facilement accessible depuis n'importe quel support est vite apparu. J'ai donc commencé ce projet et en ai profité pour me familiariser avec des technologies tel que <code>vue.js 2.0</code> pour l'application et <code>Slim Framework PHP 3.5</code> pour les APIs.</p>
  </div>
</template>

<script type="javascript">
  import { BuiIcon } from 'utils'

  export default {
    components: {
      BuiIcon
    }
  }
</script>

<style lang="scss" scoped>
  @import '~style/variables.scss';

  .infos {
    background-color: $white;
    padding: 15px;
  }
</style>
