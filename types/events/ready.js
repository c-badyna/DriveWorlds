const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Modal, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js')

module.exports = {

    name: 'ready',
    once: true,
    async execute(interaction, client) {

        require('../../handlers/CommandHandler').init(client)
        console.log(`[${client.user.tag}] ---> :` + ' ' + 'At the moment, the bot has been uploaded to the Discord API!')
        
        setInterval(() => { client.user.setPresence({ status: `online`, activities: [{ name: `заявки`, type: 2 }] }) }, 15 * 1000)

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('send_ened')
                    .setLabel('Отправить форму')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setLabel('Спонсор')
                    .setStyle(ButtonStyle.Link)
                    .setURL('https://youtube.com'),
                new ButtonBuilder()
                    .setLabel('Наш сайт')
                    .setStyle(ButtonStyle.Link)
                    .setURL('https://youtube.com'),
            );

        const EnedEmbed = new EmbedBuilder()
          .setTitle('@Questionnaire')
          .setImage('https://cdn.discordapp.com/attachments/1026584017518219295/1030448750751121418/6.0.png')
        EnedEmbed.addFields({
            name: "⌛ В скорем времени вашу форму примут...",
            value: "Все заявки отправляются в канал, которая расположена ниже (виден только администрации). Вашу форму примут, либо отклонят администраторы сервера."
        })
        EnedEmbed.addFields({
            name: "\u200b",
            value: 'Ждем вас!\nQ&A:\nЯ не могу написать в этот канал что делать? -\n1.Создайте ветку,\n2.назовите ее "Анкета (ваш ник)" и в ней пишите анкету'
        })
        const ReplyEned = await client.channels.cache.get(require('../../config.json').channels.msg_first).send({ embeds: [EnedEmbed], components: [row], fetchReply: true })
        const collector = await ReplyEned.createMessageComponentCollector();

        collector.on('collect', async i => {
            if (i.customId === 'send_ened') {
                const row = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId('accept')
                            .setLabel('Принять')
                            .setStyle(ButtonStyle.Secondary),
                        new ButtonBuilder()
                            .setCustomId('reject')
                            .setLabel('Отклонить')
                            .setStyle(ButtonStyle.Secondary),
                        new ButtonBuilder()
                            .setCustomId('property')
                            .setLabel('Запросить больше сведений')
                            .setStyle(ButtonStyle.Primary),
                    );

                const UserEmbed = new EmbedBuilder()
                  .setTitle(i.user.tag)
                  .setDescription(`Вашу форму в скорем времени примут (ну или отклонят \:) ). Пожалуйста, ожидайте... ⌛`)
                  .setFooter({ text: `Запросил(а) ${i.user.tag} (${i.user.id})` })
                  .setTimestamp()
                const ReplyProp = await client.channels.cache.get(require('../../config.json').channels.msg_two).send({ embeds: [UserEmbed], components: [row] });
                const collect = await ReplyProp.createMessageComponentCollector();

                const USER = i.guild.members.cache.get(`${i.user.id}`)
                //const USER2 = client.members.cache.get(`${i.user.id}`)

                collect.on('collect', async i => {
                    if (i.customId === 'accept') {
                        USER.roles.add(require('../../config.json').rolesA.acceptRole)
                        const AcceptEmbed = new EmbedBuilder()
                          .setTitle(`Ваша форма была принята администрацией на сервере ${require('../../config.json').server_name}!`)
                          .setDescription(`Вашу форму принял ${i.user.tag}. Чтобы не случилось, не покидайте сервер, иначе нужно будет подать форму заново!`)
                          .setFooter({ text: 'Принял ' + i.user.tag })
                        USER.send({ embeds: [AcceptEmbed] }).catch(error => { console.log(`У пользователя ${USER.tag} закрыт ЛС!`) });
                    }
                    if (i.customId === 'reject') {
                        USER.roles.add(require('../../config.json').rolesA.rejectRole)
                        const RejectEmbed = new EmbedBuilder()
                          .setTitle(`Ваша форма была отклонена администрацией на сервере ${require('../../config.json').server_name}!`)
                          .setDescription(`Вашу форму отклонил ${i.user.tag}. Чтобы не случилось, не покидайте сервер, иначе нужно будет подать форму заново!`)
                          .setFooter({ text: 'Отклонил ' + i.user.tag })
                        USER.send({ embeds: [RejectEmbed] }).catch(error => { console.log(`У пользователя ${USER.tag} закрыт ЛС!`) });
                    }
                    if (i.customId === 'property') {

                        const row334 = new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                    .setCustomId('property_ened')
                                    .setLabel('Ответить на вопросы, заданные администрацией.')
                                    .setStyle(ButtonStyle.Primary),
                            );

                        const QuProperty = await USER.send({ content: 'Привет! Администрация хотел бы задать тебе несколько вопросов. В ином случае, вашу форму отклонят.', components: [row334] }).catch(error => { console.log(`У пользователя ${USER.tag} закрыт ЛС!`) });
                        const qu = await QuProperty.createMessageComponentCollector();
                        qu.on('collect', async i => {
                            if (i.customId === 'property_ened') {
                                const modal = new ModalBuilder()
                                    .setCustomId('form')
                                    .setTitle('Заполните анкету.');

                                const first_act = new TextInputBuilder()
                                    .setCustomId('first_act')
                                    .setLabel("Сколько вам лет?")
                                    .setPlaceholder('103.')
                                    .setMinLength(1)
                                    .setMaxLength(3)
                                    .setStyle(TextInputStyle.Short);
                                const two_act = new TextInputBuilder()
                                    .setCustomId('two_act')
                                    .setLabel("У вас лицензия/пиратка?")
                                    .setPlaceholder('Пиратка, я пират ХО-ХО-ХО')
                                    .setMinLength(3)
                                    .setMaxLength(8)
                                    .setStyle(TextInputStyle.Short);
                                const three_act = new TextInputBuilder()
                                    .setCustomId('three_act')
                                    .setLabel("Вы блогер/никто из перечисленных?")
                                    .setPlaceholder('Я ютубер. Мой канал: Kuplinov ► Play, ФИО: Куплинов Дмитрий Алексеевич.')
                                    .setMinLength(15)
                                    .setMaxLength(55)
                                    .setStyle(TextInputStyle.Paragraph);

                                const actionrow1 = new ActionRowBuilder().addComponents(first_act);
                                const actionrow2 = new ActionRowBuilder().addComponents(two_act);
                                const actionrow3 = new ActionRowBuilder().addComponents(three_act);
        
                                modal.addComponents(actionrow1, actionrow2, actionrow3);
                                i.showModal(modal);

                                const filter = (interaction) => interaction.customId === 'form';
        
                                i.awaitModalSubmit({ filter, time: 100000 })
                                    .then(interaction => {
                                        const platformm = interaction.fields.getTextInputValue('first_act');
                                        const starr = interaction.fields.getTextInputValue('two_act');

                                        client.channels.cache.get(require('../../config.json').channels.msg_two).send({ content: `<@${USER.id}>\n`, embeds: [new EmbedBuilder().setDescription(`Платформа у пользователя: ${platformm}\n**${starr}**`)] })
                                    })
                            }
                        })
                    }
                })
            }
        });
    }

}